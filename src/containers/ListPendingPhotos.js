
import { ApprovePhotos } from '../components/ApprovePhotos'
import { withPendingPhotos } from '../hocs/withPendingPhotos'

export const ListPendingPhotos = withPendingPhotos(ApprovePhotos)
