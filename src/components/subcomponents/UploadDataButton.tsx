import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { procesarArchivoExcel } from '~/lib/dataHandler';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40rem',
        overflowY: 'auto',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};





const UploadDataButton = () => {
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState<any[]>([])

    const showModal = () => {
        setVisible(true);
    };

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
    
    const handleFileUpload = () => {
        procesarArchivoExcel(file, file.name);
        setVisible(false);
    }


    const hideModal = () => {
        setVisible(false);
    };

    return (
        <div className='flex w-full h-full'>

            <button
                onClick={showModal}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center w-full h-full">
                Upload Data
            </button>

            <ReactModal
                isOpen={visible}
                onRequestClose={hideModal}
                style={customStyles}>

                <h3 className="font-bold text-lg">Upload Data</h3>
                <p className="py-4">Upload your weekly document</p>

                <div>
                    <input type="file" onChange={handleFileChange} />
                    {file && (
                        <table>
                            <tbody>
                                <tr>
                                    <td>{file.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                <div className='flex justify-between px-6 mt-10 mb-5 items-center '>
                    <div className="">
                        <button className="btn" onClick={hideModal}>
                            Close
                        </button>
                    </div>
                    <button className="btn" onClick={handleFileUpload}>
                        Send
                    </button>

                </div>

            </ReactModal>

        </div>



    )
}

export default UploadDataButton