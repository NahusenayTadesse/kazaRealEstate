import { renderComponent } from '$lib/components/ui/data-table/index.js';
import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
import DataTableActions from './data-table-actions.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import ImageViewer from '$lib/components/Table/image-viewer.svelte';
import PriceList from './priceList.svelte';
import { formatETB, formatEthiopianDate } from '$lib/global.svelte';
import BigText from '$lib/components/Table/bigText.svelte';
import Statuses from '$lib/components/Table/statuses.svelte';
import VideoViewer from '$lib/components/Table/videoViewer.svelte';

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
		accessorKey: 'rawPlan',
		header: 'Raw Plan',
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(ImageViewer, {
				src: row.original.rawPlan,
				alt: row.original.name
			});
		}
	},
	{
		accessorKey: 'videoTourUrl',
		header: 'Video Tour',
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(VideoViewer, {
				videoUrl: row.original.videoTourUrl,
				class: 'w-15 h-15',
				dialog: true
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
				id: row.original.id,
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
		accessorKey: 'bathrooms',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Bathrooms',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},
	{
		accessorKey: 'bedrooms',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Bedrooms',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},
	{
		accessorKey: 'price',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Price',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return formatETB(row.original.price);
		}
	},

	{
		accessorKey: 'status',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Status',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(Statuses, {
				status: row.original.status ? 'available' : 'sold'
			});
		}
	},
	{
		accessorKey: 'amenities',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Number of Amenities',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return row.original.features + ' ameneties';
		}
	},

	{
		accessorKey: 'sizeSqm',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Size (sqm)',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return row.original.sizeSqm + ' sqm';
		}
	},

	{
		accessorKey: 'floorNumber',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Floor Number',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return row.original.floorNumber + ' floor/' + row.original.totalFloors + ' floors';
		}
	},
	{
		accessorKey: 'yearBuilt',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Year Built',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},

	{
		accessorKey: 'city',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'City',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
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
				html: true,
				viewText: 'Short Summary'
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
				html: true,
				viewText: 'Description'
			});
		}
	}
];
