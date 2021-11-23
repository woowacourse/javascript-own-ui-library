export const getCounterNodeObj = (state) => {
	// 상상속의 신세한탄 JSX Parser를 쓰면 아래처럼 리턴된다는 가정 하에 만든 샘플입니다.

	return {
		tag: 'div',
		id: null,
		class: 'container',
		childrenType: 'node',
		children: [
			{
				tag: 'div',
				id: null,
				class: null,
				childrenType: 'text',
				children: '🎀신세한탄의 카운터 앱입니다 >< 🎀',
			},
			{
				tag: 'span',
				id: null,
				class: 'count',
				childrenType: 'number',
				children: state.count,
			},
			{
				tag: 'div',
				id: null,
				class: 'btn-group',
				childrenType: 'node',
				children: [
					{
						tag: 'button',
						id: 'minus-button',
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
						id: 'reset-button',
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
						id: 'plus-button',
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
			{
				tag: 'span',
				id: null,
				class: 'count',
				childrenType: 'number',
				children: state.secondCount,
			},
			{
				tag: 'div',
				id: null,
				class: 'btn-group',
				childrenType: 'node',
				children: [
					{
						tag: 'button',
						id: 'second-minus-button',
						class: null,
						childrenType: 'node',
						children: [
							{
								tag: 'strong',
								id: null,
								class: null,
								childrenType: 'text',
								children: '-10',
							},
						],
					},
					{
						tag: 'button',
						id: 'second-reset-button',
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
						id: 'second-plus-button',
						class: null,
						childrenType: 'node',
						children: [
							{
								tag: 'strong',
								id: null,
								class: null,
								childrenType: 'text',
								children: '+10',
							},
						],
					},
				],
			},
		],
	};
};
