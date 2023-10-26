import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Calendar from './Calendar';

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:date?" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
