import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { routes } from './routes'
import Home from '../pages/Home/index'
import IDE from '../pages/IDE'
import Notebook from '../pages/Notebook'
import PreviewProvider from '../context/PreviewContext'

function Router() {
    return (
        <Routes>
            <Route path={routes.ROOT} element={
                <PreviewProvider>
                    <Home />
                </PreviewProvider>
            } />
            <Route path={routes.IDE} element={<IDE />} />
            <Route path={routes.NOTEBOOK} element={<Notebook />} />
        </Routes>
    )
}

export default Router