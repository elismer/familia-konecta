
import { ApproveComments } from '../components/ApproveComments'
import { withPendingComments } from '../hocs/withPendingComments'

export const ListPendingComments = withPendingComments(ApproveComments)
