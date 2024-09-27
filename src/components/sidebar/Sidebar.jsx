'use client'
import {
    Sidebar,
    SidebarBody,
    SidebarList,
} from 'keep-react'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routes'
import SidebarLinks from './Links'

export const SidebarComponent = () => {


    return (
        <Sidebar className='h-screen max-h-screen rounded-none !bg-accent w-1/5 border-0 fixed'>
            <SidebarBody>
                <Link to="/" className="inline-flex items-center">
                    <img src="./logounsa.png" alt="" />
                </Link>
                <p className='uppercase text-metal-400 pr-2 text-center'>SISTEMA DE MUESTRA PARA LA MATERIA DE PROGRAMACIÓN NUMÉRICA</p>
                <SidebarList className='pt-3 max-h-[63vh] overflow-y-scroll no-scrollbar'>
                    <SidebarLinks routes={routes}/>
                </SidebarList>
            </SidebarBody>
        </Sidebar>
    )
}
