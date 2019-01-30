export const center = [52.018424, 47.819667]

export const controls = ['zoomControl', 'fullscreenControl']

export const query = {
	ns: 'use-load-option',
	load: [
		'Map',
		'Placemark',
		'Polyline',
		'geocode',
		'geoObject.addon.balloon',
		...makeControlsToLoad(controls)
	].join(',')
}

function makeControlsToLoad(modules) {
	return modules.map(mod => {
		mod = mod.replace(/\w/, l => l.toUpperCase())
		return `control.${mod}`
	})
}