import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import $ from 'jquery'
import _ from 'lodash'
import noUiSlider from 'nouislider'
import 'datatables.net'
import 'dropzone/dist/dropzone-min.js'
import { BrowserRouter } from 'react-router-dom'
import * as VanillaCalendarPro from 'vanilla-calendar-pro'

import App from './App.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {AuthProvider} from "./core/contexts/AuthContext";

window._ = _
window.$ = $
window.jQuery = $
window.DataTable = $.fn.dataTable
window.noUiSlider = noUiSlider
window.VanillaCalendarPro = VanillaCalendarPro

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <App />
          </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
