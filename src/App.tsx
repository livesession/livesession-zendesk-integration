import React, {useState} from 'react'

import {SessionsContext} from "./contexts/SessionsContext";
import {SessionResponse} from "./core/objects";
import {SessionsListContainer} from "./containers/SessionsListContainer";

function App() {
    const [sessions, setSessions] = useState<SessionResponse>(null);

    return <SessionsContext.Provider value={[sessions, setSessions]}>
        <div className="app">
            <SessionsListContainer/>
        </div>
    </SessionsContext.Provider>
}

export default App