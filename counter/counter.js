export const getCounterNodeObj = {
	tag: 'div',
	id: null,
	class: 'container',
	childrenType: 'node',
	children: [
		{
			tag: 'span',
			id: null,
			class: 'count',
			childrenType: 'number',
			children: '0',
		},
		{
			tag: 'div',
			id: null,
			class: 'btn-group',
			childrenType: 'node',
			children: [
				{
					tag: 'button',
					id: null,
					class: null,
					childrenType: 'node',
					children: [
						{
							tag: 'strong',
							id: null,
							class: null,
							childrenType: 'text',
							children: '-',
						},
					],
				},
				{
					tag: 'button',
					id: null,
					class: null,
					childrenType: 'node',
					children: [
						{
							tag: 'strong',
							id: null,
							class: null,
							childrenType: 'text',
							children: 'RESET',
						},
					],
				},
				{
					tag: 'button',
					id: null,
					class: null,
					childrenType: 'node',
					children: [
						{
							tag: 'strong',
							id: null,
							class: null,
							childrenType: 'text',
							children: '+',
						},
					],
				},
			],
		},
	],
};
