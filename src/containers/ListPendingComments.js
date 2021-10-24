
import { ApproveComments } from '../components/ApproveComments'
import { withPendingPhotos } from '../hocs/withPendingPhotos'

export const ListPendingComments = withPendingPhotos(ApproveComments)
