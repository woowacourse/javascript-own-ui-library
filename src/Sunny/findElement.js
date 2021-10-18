/* parent: SunnyDomNode */
const findElement = (parent, { id, className, tagName, textContent }) => {
  // 아이디는 유일값이므로 id 만 비교
  if (parent.id === id) {
    return parent;
  }

  // 클래스는 유일 값이 아니므로 태그까지 비교
  // 다만 현재는 key를 별도로 구현하지 않아서, 태그 + 클래스 명 조합은 유일하다고 가정
  // ex)
  // button.reset, div.reset => 가능
  // button.reset, button.reset => 불가능
  if (parent.class === className && parent.tagName === tagName) {
    return parent;
  }

  if (!parent.children.length) {
    return null;
  }

  for (let i = 0; i < parent.children.length; i++) {
    const $elem = findElement(parent.children[i], { id, className, tagName, textContent });

    // 조건에 맞는 element는 하나뿐이라고 가정하므로, 찾으면 return.
    if ($elem) {
      return $elem;
    }
  }
};

export default findElement;
