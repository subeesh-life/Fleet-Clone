import { boot } from 'quasar/wrappers'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Define interface for internal Icon properties
interface DefaultIconPrototype extends L.Icon.Default {
  _getIconUrl?: string
}

// Fix for the default marker icon issue
delete (L.Icon.Default.prototype as DefaultIconPrototype)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/marker-icon-2x.png',
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png',
})

// Make L (Leaflet) globally available
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    L: typeof L
  }
}

// Export the boot function as the default export
export default boot(({ app }) => {
  app.config.globalProperties.L = L
})

// Optional: Export L if you need to import it directly somewhere
export { L }
