import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/relax.css'

function noty (message, type) {
  new Noty({
    text: message,
    type,
    timeout: 3000,
    progressBar: true,
    layout: 'top'
  }).show()
}

export default noty
