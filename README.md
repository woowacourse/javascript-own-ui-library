<p align="middle">Level4 - Step 1</p>
<h2 align="middle">Virtual DOM 만들기</h2>

## 🎯 후기

```
기본적인 렌더러만 구현했습니다.
jsx는 react를 사용해 변환하는 방식으로 작동 시켰습니다.
상태관리 업데이트 되게끔 구현했습니다.

다음 단계에서

1. react 의존성 제거후 custom createElement 구현
2. diff 알고리즘

위주로 개선해보겠습니다
```

## 📝 Requirements

### 필수 요구사항

- [x] 렌더러 구현
- [x] 직접 구현한 렌더러와 VirtualDOM으로 Counter App 렌더링
- [x] DOM Node 비교
- [x] 업데이트 DOM Node
- [x] 렌더링한 Counter App 동작시키기
- [x] `데이터 변경에 반응`하여 렌더링되도록 구현
- [ ] VirtualDOM 생성 팩토리 함수 구현 (aka createElement)

### 심화 요구사항

- [ ] 문자열 기반의 JSX Parser 구현
- [ ] AST 처리 기반의 JSX Parser 구현
- [ ] 동일한 Element인 경우 Key 속성을 만들어 순서를 지정하도록 구현
- [ ] Router 구현 후 Query Parameter를 사용해 초기 값 정의
