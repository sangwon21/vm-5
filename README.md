# 웹 자판기 

### 스크린샷

![screenshot](https://user-images.githubusercontent.com/58209009/77041909-a31e7980-69b2-11ea-823a-37ee04dba4d5.png)

## 마크업 구조

![structure](https://user-images.githubusercontent.com/58209009/76302739-6bc81280-62b8-11ea-8c24-856b788949ba.png)

- 상품 화면: `div.product`
  - 상품 리스트: `ul.product-list`
  - 상품 개별 리스트: `li.product-item`
    - 상품 번호: `item-index`
    - 상품 이름(이모지): `item-name`
    - 상품 가격: `item-price`
- 상품 선택 화면: `div.selector`
  - 가격 및 금액 출력창: `div.price-window`
  - 숫자 버튼 리스트: `ul.select-button-list`
  - 취소, 입력 버튼 클래스: `button.command`
  - 이벤트 출력 창: `div.message-window`
  - 이벤트 메세지 리스트: `ol.message`
- 지갑 화면: `div.wallet`
  - 총 금액: `div.wallet-sum`

## CSS

- SASS 사용해서 스타일 시트 작성 후 `node-sass`를 통해 CSS로 변환
- `grid`, `flex` 사용

## [JavaScript](https://codesquad-memeber-2020.github.io/vm-5/document/)

위의 링크 클릭 시 자바스크립트 코드를 정리해놓은 문서로 이동됩니다.

