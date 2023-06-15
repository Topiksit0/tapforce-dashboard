import * as XLSX from 'xlsx';
import { useFirestore } from './firebase';
import { doc, setDoc, collection, getDoc, updateDoc, getDocs } from 'firebase/firestore'
import { Response } from 'express';
import Swal from 'sweetalert2';

type DeltaType = 'moderateIncrease' | 'moderateDecrease';

interface CategoryData {
    title: string;
    metric: string;
    metricPrev: string;
    delta: string;
    deltaType: DeltaType;
}

interface UserStats {
    posicion: string;
    username: number;
    encontrados: string;
    puntos: string;
    delta: string;
    deltaType: "moderateIncrease" | "moderateDecrease" | "increase" | "unchanged" | "decrease";
}

interface ChartPuntuacion {
    title: string;
    puntos: number;
}


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export async function getUserlistData() {

    const semanasCollectionRef = collection(useFirestore(), 'semanas');
    const querySnapshot = await getDocs(semanasCollectionRef);

    const documentos: [any[], string][] = [];
    querySnapshot.forEach((doc) => {
        const datos = doc.data();
        documentos.push([datos, doc.id]);
    });

    documentos.sort((a, b) => {
        const fechaA = new Date(a[1]);
        const fechaB = new Date(b[1]);
        return fechaA.getTime() - fechaB.getTime();
    });

    const last = documentos[documentos.length - 1];
    const compared = documentos[documentos.length - 2];
    const userStats: UserStats[] = [];
    const delta = 'N/A';
    const deltaType = "unchanged";

    last[0].jugadores.forEach((jugador) => {
        const username = jugador.username;
        const encontrados = jugador.encontrados;
        const puntos = jugador.puntos;

        const formattedNumber = puntos.toLocaleString("en-US");
        const formattedNumberWithDot = formattedNumber.split(',').join('.');

        for (let i = 0; i < compared[0].jugadores.length; i++) {
            if (compared[0].jugadores[i].username === username) {
                var penultimoPuntos = compared[0].jugadores[i].puntos;
            }
        }

        const delta = calculateDeltaUserList(puntos, penultimoPuntos);
        const deltaType = calculateDeltaTypeUserList(delta);

        userStats.push({
            posicion: jugador.clasificacion,
            username: username,
            encontrados: encontrados,
            puntos: formattedNumberWithDot,
            delta: delta,
            deltaType: deltaType,
        });
    });

    return userStats;

}


export async function getChartPosicionData() {
    const semanasCollectionRef = collection(useFirestore(), 'semanas');
    const querySnapshot = await getDocs(semanasCollectionRef);
    const documentos: [any[], string][] = [];
    querySnapshot.forEach((doc) => {
        const datos = doc.data();
        documentos.push([datos, doc.id]);
    });

    documentos.sort((a, b) => {
        const fechaA = new Date(a[1]);
        const fechaB = new Date(b[1]);
        return fechaA.getTime() - fechaB.getTime();
    });

    const chartPuntuacion: ChartPuntuacion[] = documentos.map((documento) => {
        const fecha = documento[1];
        const encontradosGlobal = documento[0]?.encontradosGlobal ?? 0;

        return {
            date: fecha,
            Recaudadores: encontradosGlobal,
        };
    });
    return chartPuntuacion;

}

export async function getChartPuntuacionData() {
    const semanasCollectionRef = collection(useFirestore(), 'semanas');
    const querySnapshot = await getDocs(semanasCollectionRef);
    const documentos: [any[], string][] = [];
    querySnapshot.forEach((doc) => {
        const datos = doc.data();
        documentos.push([datos, doc.id]);
    });

    documentos.sort((a, b) => {
        const fechaA = new Date(a[1]);
        const fechaB = new Date(b[1]);
        return fechaA.getTime() - fechaB.getTime();
    });

    const chartPuntuacion: ChartPuntuacion[] = documentos.map((documento) => {
        const fecha = documento[1];
        const puntuacionGlobal = documento[0]?.puntuacionGlobal ?? 0;

        return {
            date: fecha,
            Recaudadores: puntuacionGlobal,
        };
    });
    return chartPuntuacion;
}

export async function getCategoriesData() {
    const semanasCollectionRef = collection(useFirestore(), 'semanas');
    const querySnapshot = await getDocs(semanasCollectionRef);

    const documentos: [any[], string][] = [];
    querySnapshot.forEach((doc) => {
        const datos = doc.data();
        documentos.push([datos, doc.id]);
    });

    documentos.sort((a, b) => {
        const fechaA = new Date(a[1]);
        const fechaB = new Date(b[1]);
        return fechaA.getTime() - fechaB.getTime();
    });

    const last = documentos[documentos.length - 1];
    const compared = documentos[documentos.length - 2];

    const categories: CategoryData[] = [
        {
            title: 'Puntos',
            metric: `${last[0].puntuacionGlobal}`,
            metricPrev: `${compared[0].puntuacionGlobal}`,
            delta: calculateDelta(last[0].puntuacionGlobal, compared[0].puntuacionGlobal),
            deltaType: calculateDeltaType(last[0].puntuacionGlobal, compared[0].puntuacionGlobal),
        },
        {
            title: 'Mekas',
            metric: `${last[0].encontradosGlobal}`,
            metricPrev: `${compared[0].encontradosGlobal}`,
            delta: calculateDelta(last[0].encontradosGlobal, compared[0].encontradosGlobal),
            deltaType: calculateDeltaType(last[0].encontradosGlobal, compared[0].encontradosGlobal),
        },
        {
            title: 'Posición',
            metric: `${last[0].posicionGlobal}`,
            metricPrev: `${compared[0].posicionGlobal}`,
            delta: calculateDelta(compared[0].posicionGlobal, last[0].posicionGlobal),
            deltaType: calculateDeltaType(compared[0].posicionGlobal, last[0].posicionGlobal),
        },
    ];

    return categories;
}
function calculateDeltaUserList(currentPuntos: number, penultimoPuntos: number | undefined): string {
    if (penultimoPuntos === undefined) {
        return "N/A";
    }

    const deltaValue = ((currentPuntos - penultimoPuntos) / penultimoPuntos) * 100;
    const deltaPercentage = deltaValue.toFixed(1);

    return `${deltaPercentage}%`;
}

function calculateDeltaTypeUserList(delta: string): UserStats["deltaType"] {
    if (delta === "N/A") {
        return "unchanged";
    }

    const deltaValue = parseFloat(delta);

    if (deltaValue > 0) {
        if (deltaValue < 20) {
            return "moderateIncrease";
        } else {
            return "increase";
        }
    }
    if (deltaValue < 0) {
        if (deltaValue > -20) {
            return "moderateDecrease";
        } else {
            return "decrease";
        }
    }
    else {
        return "unchanged";
    }
}

function calculateDelta(currentValue: number | string, prevValue: number | string): string {
    const currentNumber = Number(currentValue);
    const prevNumber = Number(prevValue);
    const delta = ((currentNumber - prevNumber) / prevNumber) * 100;
    return `${delta.toFixed(1)}%`;
}

function calculateDeltaType(currentValue: number | string, prevValue: number | string): DeltaType {
    const currentNumber = Number(currentValue);
    const prevNumber = Number(prevValue);
    return currentNumber >= prevNumber ? 'moderateIncrease' : 'moderateDecrease';
}

//funcion de typescript que proceso un archivo xlsx
export async function procesarArchivoExcel(file: File, nombreArchivo: string) {
    try {
        const reader = new FileReader();
        let jsonData: any;

        const procesarDatos = async (event: ProgressEvent<FileReader>) => {
            const data = new Uint8Array(event.target!.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const range = worksheet['!ref'];
            const startRow = 4;
            const newRange = `A${startRow}:${range.split(':')[1]}`;

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: newRange });


            const identificadorSemana = obtenerIdentificadorSemana(nombreArchivo);
            const semanaDocRef = doc(collection(useFirestore(), 'semanas'), identificadorSemana);
            const semanaDocSnap = await getDoc(semanaDocRef);
            const puntuacionGlobal = worksheet['G1']?.v;
            const encontradosGlobal = worksheet['I1']?.v;
            const posicionGlobal = worksheet['K1']?.v;

            if (!puntuacionGlobal || !encontradosGlobal || !posicionGlobal) {
                throw new Error('Global data not found');
            }

            const jugadoresData = jsonData.map((row: any) => ({
                clasificacion: row[0],
                username: row[1],
                puntos: row[2],
                encontrados: row[3],
            }));

            if (semanaDocSnap.exists()) {
                await updateDoc(semanaDocRef, {
                    jugadores: jugadoresData,
                    puntuacionGlobal,
                    encontradosGlobal,
                    posicionGlobal,
                });
            } else {

                await setDoc(semanaDocRef, {
                    jugadores: jugadoresData,
                    puntuacionGlobal: puntuacionGlobal,
                    encontradosGlobal: encontradosGlobal,
                    posicionGlobal: posicionGlobal,
                });
            };
        }
        reader.onload = procesarDatos;
        reader.readAsArrayBuffer(file);
    }
    catch (e: any) {
        Toast.fire({
            icon: 'error',
            text: e.message,
            title: 'Something went wrong'
        })
    }
}


function obtenerIdentificadorSemana(nombreArchivo: string): string {
    const partes = nombreArchivo.split('_');
    return partes[1].split('.')[0];
}

