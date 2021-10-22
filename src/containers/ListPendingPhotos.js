
import { ApprovePhotosContainer } from '../components/ApprovePhotosContainer'
import { withPendingPhotos } from '../hocs/withPendingPhotos'

export const ListPendingPhotos = withPendingPhotos(ApprovePhotosContainer)
