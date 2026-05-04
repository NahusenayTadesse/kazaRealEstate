<script>
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import Statuses from '$lib/components/Table/statuses.svelte';

	import Read from './read.svelte';
	import Delete from './delete.svelte';
	import BigText from './bigText.svelte';

	const columns = [
		{
			id: 'index',
			header: '#',
			cell: (info) => {
				const rowIndex = info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id);
				return rowIndex + 1;
			},
			enableSorting: false
		},

		{
			accessorKey: 'name',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Name',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true
		},

		{
			accessorKey: 'phone',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Phone',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => renderComponent(Copy, { data: row.original.phone })
		},
		{
			accessorKey: 'email',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Email',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => renderComponent(Copy, { data: row.original.email })
		},
		{
			accessorKey: 'property',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Property',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) =>
				renderComponent(DataTableLinks, {
					id: row.original.propertyId,
					name: row.original.property,
					link: `/dashboard/properties/single`,
					target: '_blank',
					IconComp: House
				})
		},
		{
			accessorKey: 'message',
			header: 'Message',
			sortable: true,
			cell: ({ row }) => renderComponent(BigText, { text: row.original.message })
		},
		{
			accessorKey: 'status',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Read Status',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Statuses, {
					status: row.original.status
				});
			}
		},

		{
			accessorKey: '',
			header: 'Reply',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Reply, {
					id: row.original.id,
					data: data.replyForm,
					name: row.original.name,
					email: row.original.email
				});
			}
		},

		{
			accessorKey: '',
			header: 'Delete',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Delete, {
					id: row.original.id,
					action: '?/delete',
					data: data.deleteForm
				});
			}
		}
	];
	let { data } = $props();

	import Copy from '$lib/Copy.svelte';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import Reply from './reply.svelte';
	import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
	import { House } from '@lucide/svelte';

	let filteredList = $derived(data?.allQuotes);
</script>

<svelte:head>
	<title>Quotes</title>
</svelte:head>

<Reply data={data?.replyForm} />

<br />
<br />

{#key data?.allQuotes}
	<FilterMenu
		data={data?.allQuotes}
		bind:filteredList
		filterKeys={['serviceType', 'eventLocation', 'guestCount', 'isRead']}
	/>
	<DataTable {columns} class="lg:max-w-6xl!" data={filteredList} search={true} fileName="Quotes" />
{/key}
