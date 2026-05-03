import { renderComponent } from '$lib/components/ui/data-table/index.js';
import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
import DataTableActions from './data-table-actions.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import ImageViewer from '$lib/components/Table/image-viewer.svelte';
import PriceList from './priceList.svelte';
import { formatEthiopianDate } from '$lib/global.svelte';
import BigText from '$lib/components/Table/bigText.svelte';
import Statuses from '$lib/components/Table/statuses.svelte';

export const columns = [
	{
		accessorKey: 'index',
		header: '#',
		cell: (info) => info.row.index + 1,
		sortable: false
	},

	{
		accessorKey: 'featuredImage',
		header: 'Featured Image',
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(ImageViewer, {
				src: row.original.featuredImage,
				alt: row.original.name
			});
		}
	},

	{
		accessorKey: 'title',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Title',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableLinks, {
				id: row.original.slug,
				name: row.original.title,
				link: '/dashboard/properties/single'
			});
		}
	},

	{
		accessorKey: 'type',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Type',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},

	{
		accessorKey: 'type',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Type',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},
	{
		accessorKey: 'features',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Number of Features',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return row.original.features + ' ameneties';
		}
	},

	{
		accessorKey: 'address',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Address',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},
	{
		accessorKey: 'googleMapsUrl',
		header: 'Google Maps',

		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(BigText, {
				text: row.original.googleMapsUrl,
				html: true,
				viewText: 'Google Maps'
			});
		}
	},

	{
		accessorKey: 'shortSummary',
		header: 'Short Summary',

		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(BigText, {
				text: row.original.shortSummary,
				html: true
			});
		}
	},

	{
		accessorKey: 'description',
		header: 'Description',

		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(BigText, {
				text: row.original.description,
				html: true
			});
		}
	}
];
