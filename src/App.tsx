import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Calendar from './Calendar';

function App(): React.JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:date?" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
