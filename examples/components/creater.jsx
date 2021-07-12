import OGDFLayoutTestPage from './page.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
export default function createPage(id) {
    ReactDOM.render(<OGDFLayoutTestPage />, document.getElementById(id))
}
