export default function SBadge(data) {
    switch (data) {
        case 'NEW':
            return <span class="badge badge-success">{data}</span>
        case 'CANCEL':
            return <span class="badge badge-danger">{data}</span>
        case 'LIVEIN':
            return <span class="badge badge-primary">{data}</span>
        case 'CHECKED OUT':
            return <span class="badge badge-warning">{data}</span>
        default:
            break;
    }
}