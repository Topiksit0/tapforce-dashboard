import { Router } from "~/components/router/Router";
import { setupFirebase } from "~/lib/firebase";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Main() {
  useEffect(() => {
    setupFirebase();
  }, []);
  
  return (
    <main>
      <Router />
    </main>
  );
}

export default Main;
