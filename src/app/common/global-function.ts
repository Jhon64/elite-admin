import { localStorageHelper } from "../helpers/localstorage.helper"


// import {publicIpv4} from 'public-ip';
export namespace GlobalFunction {
	/**Guardar la navegacion en el storage */
	export const setSavedNavRoutesStorage = (routes: any[]) => {
		localStorageHelper.createItem('_routes_nav', routes)
	}
	/**obtener la navegacion del storage */
	export const getSavedNavRoutesStorage = () => {
		return localStorageHelper.getItemObject('_routes_nav') as any[]
	}

	export const getRoutesActive = () => {
    // const routesAll = (localStorageHelper.getItemObject('__navegacion') as any[]) || []
    // const modSelected = GlobalFunction.getProyectoStorage()
    // const empresaID = GlobalFunction.getEmpresaIDStorage()
    // if (!empresaID) return []
    // if (!modSelected) return []
    // const routesByEmpresa = routesAll.find((x) => x.empresaID == empresaID)?.sidebar ?? []
    // if (!routesByEmpresa) return []
    // const moduleRoutes = routesByEmpresa.find((x) => x.moduloID == modSelected.moduloID)
    // if (!moduleRoutes) return []
    // const path = moduleRoutes.path
    // const routes = (moduleRoutes?.children || []).map((x) => ({ ...x, path: `${path}/${x.path}` }))
    // return routes
  }

	/** función para obtener el id del proyecto seleccionado del localsotarge*/
	export const getPublicKey = () =>
		localStorageHelper.getItemString('_public_key')

	/** función para setear el valor de id del proyecto  en el localsotarge*/
	export const setPublicKey = (publicKey: string) =>
		localStorageHelper.createItem('_public_key', publicKey)
	/** función para obtener el id del proyecto seleccionado del localsotarge*/
	export const getEmpresaIDStorage = () =>
		localStorageHelper.getItemNumber('_proyect_empresa_id')

	/** Función para traer los modulos permitidos por empresa */
	export const getAllModulo = () => {
		const modulos = localStorageHelper.getItemObject('__modulos')
		return modulos.map((m: any) => m)
	}

	/** Función para traer los modulos permitidos por empresa */
	export const getModuloByCompany = () => {
		const empresaId = localStorageHelper.getItemNumber('_proyect_empresa_id')
		const modulos = localStorageHelper.getItemObject('__modulos')
		return modulos
			.filter((m: any) => m.empresaID === empresaId)
			.map((m: any) => m)
	}
	/** Función para traer los modulos permitidos por empresa */
	export const getModuloByCompanyAndByModuloID = (moduloID: number) => {
		const empresaId = localStorageHelper.getItemNumber('_proyect_empresa_id')
		const modulos = localStorageHelper.getItemObject('__modulos')
		return modulos
			.filter((m: any) => m.empresaID === empresaId)
			.find((m: any) => m.moduloID == moduloID)
	}

	/** Función para traer los modulos permitidos por empresa */
	export const getModuloIDSstoragePorEmpresa = () => {
		const empresaId = localStorageHelper.getItemNumber('_proyect_empresa_id')
		const modulos = localStorageHelper.getItemObject('__modulos')
		return modulos
			.filter((m: any) => m.empresaID === empresaId)
			.map((m: any) => m.moduloID)
	}

	/** Función para traer las unidades organizativas permitidos por empresa */
	export const getUnidadOrganizativaIDSstoragePorEmpresa = () => {
		const empresaId = localStorageHelper.getItemNumber('_proyect_empresa_id')
		const modulos = localStorageHelper.getItemObject('__modulos')
		return modulos
			.filter((m: any) => m.empresaID === empresaId)
			.map((m: any) => m.unidadOrganizativaId)
	}

	/** función para setear el valor de id del proyecto  en el localsotarge*/
	export const setEmpresaStorage = (empresa: any) =>
		localStorageHelper.createItem('_proyect_empresa_selected', empresa)
	/** función para obtener el id del proyecto seleccionado del localsotarge*/
	export const getEmpresaStorage = () =>
		localStorageHelper.getItemObject('_proyect_empresa_selected')

	/** función para setear el valor de id del proyecto  en el localsotarge*/
	export const setProyectIDStorage = (proyectoID: number) =>
		localStorageHelper.createItem('_proyect_select_id', proyectoID)
	/** función para obtener el id del proyecto seleccionado del localsotarge*/
	export const getProyectIDStorage = () =>
		localStorageHelper.getItemNumber('_proyect_select_id')

	/** función para setear el valor del proyecto informacion completa localsotare*/
	export const setProyectoStorage = (proyecto: any) => {
		localStorageHelper.createItem('_proyecto_select', proyecto)
	}

	/** función para obtener el valor del proyecto seleccionada en el localsotare*/
	export const getProyectoStorage = () =>
		localStorageHelper.getItemObject('_proyecto_select') as any

	/**informacion del empleado*/
	export const setUsuarioStorage = (usuario: any) =>
		localStorageHelper.createItem('_usuario', usuario)
	/** obtener informacion del empleado del localstorage*/
	export const getUsuarioStorage = (): any | null =>
		localStorageHelper.getItemObject('_usuario') as any | null

	export const setIPStorage = (ip: string) =>
		localStorageHelper.createItem('_ip', ip)
	/**nombre del usuario logeado almacenado en el localstorage */
	export const getUsername = () => {
		const user = getUsuarioStorage()

		if (user) {
			const email = user.username || ''
			// if (email.length >= 47) {
			// 	return email.substring(0, 47).concat('...')
			// }
			return email
		} else return
	}
	export const getIPStorage = () => {
		return localStorageHelper.getItemString('_ip')
	}

	export const getIP = async () => {
		const response = await fetch('https://api.ipify.org/?format=json')
		const result = await response.json()
		const ip = result?.ip || ''

		return ip
	}
}
