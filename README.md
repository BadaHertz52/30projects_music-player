# music player (width react)

#### [🎚️ 프로젝트 사이트 바로가기](https://badahertz52.github.io/30projects_music-player)

## Index

#### <a href="#introduce">1.프로젝트 소개 </a>

#### <a href="#skill">2.Tech Skill and Build</a>

#### <a href="#study">3.배운 것들</a>

- #### <a href="#npm">1) npm 패키지 배포 </a>
- #### <a href="#js">2) js 라이브러리 typescript에서 사용하기</a>
- #### <a href="#classNames">3) classNames와 CSS Module</a>
- #### <a href="#ref">4)forwardRef, useImperativeHandle </a>
- #### <a href="#export">5) scss :export </a>

---

## <div id="introduce">1.프로젝트 소개 </div>

### <div>1)프로젝트 목적 </div>

해당 프로젝트를 통해 다음을 시도해보고자 했다.

- 리스트를 드래그 앤 드롭을 통해 재정렬하는 기능 구현
- js,typescript 로 구현한 패키지를 npm에 배포
- classNames 라이브러리와 css module을 같이 사용
- 음악을 재생하는 music player 구현

### <div>2) music player? </div>

  <img src="./readme_img/mp.gif" alt="music player" width="250px"/>
  
  music player는 다음과 같은 기능들을 제공한다.

- 기능
  - 랜덤 재생, 한곡 반복 재생, 전곡 반복 재생
  - 이전 곡, 다음 곡 이동
  - 진행바를 통해 노래 구문 이동
  - 볼륨 조절
  - 드래그 앤 드롭으로 플레이리스트 재정렬

### <div id="skill">2.Tech Skill and Build</div>

- Skill

  - HTML, CSS(SCSS, CSS Module)
  - Typescript
  - React
  - Redux

- Install
  ```bash
  npm i
  ```
- Start dev server
  ```bash
  npm run start
  ```
- Build
  ```bash
  npm run build
  ```

### <div id="study">3.배운 것들</a>

### <div id="npm">1) npm 패키지 배포 </div>

드래그 앤 드롭을 통해 아이템을 재정렬할 수 있는 패키지(이하 sortable list)를 npm에 배포 후에 해당 패키지를 music player 프로젝트에 사용했다.

프로젝트에서 사용한 sortable list 패키지와 패키지를 만들면서 배운 점들은 아래의 링크를 통해 확인할 수 있다.

[🔗js로 만든 sortable list 패키지에 대한 github 저장소 바로가기](https://github.com/BadaHertz52/sortable)

[🔗 typescript로 만든 sortable list 패키지에 대한 github 저장소 바로가기](https://github.com/BadaHertz52/sortable-list-tsc)

### <div id="js">2) js 라이브러리 typescript에서 사용하기</div>

처음에는 js로 만든 sortable list 패키지만 있었기 때문에, typescript로 진행하는 해당 프로젝트에서는 sortable list 를 사용하기 위해서는 해당 패키지에 대한 모듈을 만들어주어야 했다.

index.d.ts 파일을 추가해 js라이브러리르 typescript환경에서 사용할 수 있도록 하는 방법에 대해 알게 되었고 이는 아래의 블로그 글에 정리해두었다.

[🔗 ts에서 js라이브러리 사용하기 -index.d.ts 모듈 ](https://velog.io/@badahertz52/ts%EC%97%90%EC%84%9C-js%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-index.d.ts-%EB%AA%A8%EB%93%88)

### <div id="classNames">3) classNames와 CSS Module</div>

classNames라이브러리를 사용하면 조건부로 className를 결합하거나 객체형식으로 전달할 수 있는다.
classNames를 통해 클래스를 설정하는 방법은 다음과 같다.

```js
  import classNames from 'classnames';

  // 문자열로 className 결합
  <div className={classNames('foo', 'bar')}>  </div>
  //=> <div class="foo bar">

  //객체로 className 결합
  <div className={classNames({ foo: true, bar: false })}> </div>
  // => <div class="foo">

  //배열로 className 결합
  <div className={classNames(['foo', 'bar'])}> </div>
  // => <div class="foo bar">

```

그렇다면 CSS Module에서 설정한 스타일을 classNames을 통해 요소에 전달하려면 어떻게 해야할까?

```typescript
import styles from "./style.module.scss";
//...
<div className={classNames(styles.className)}>//....</div>;
```

위의 코드처럼 CSS Module에서 지정한 스타일을 가져와 classNames의 인수로 넣어주면 된다.

조건에 따라 클래스를 변경하고 싶다면 다음과 같이 작성하면 된다.

ex ) 기본적으로 styles.row를 적용하되 조건부로 styles.playing을 적용하는 코드

```typescript
import styles from "./style.module.scss";
const Component = () => {
  //...
  return (
    <div
      className={classNames(styles.row, {
        [styles.playing]: currentIndex === index,
      })}
    >
      //....
    </div>
  );
};
```

### <div id="ref">4)forwardRef, useImperativeHandle </div>

audio 요소에 대한 작동을 audio가 있는 컴포넌트 외의 다른 컴포넌트에서도 할 수 있도록 하기 위해서 MusicPlayer 컴포넌트에서 Progress 컴포넌트에 있는 audio 요소에 접근하고, 해당 요소의 속성을 다루는 함수를 만들어 Control등의 다른 컴포넌트에 props로 넘겨주어야했다.

이를 위해 사용한 게 바로 forwardRef, useImperativeHandle 이다.
forwardRef, useImperativeHandle를 사용하면서 배운 것들을 블로그에 정리했다.

[🔗 forwardRef, useImperativeHandle 에 대해 정리한 블로그 글 보러가기](https://velog.io/@badahertz52/React-ref%EC%99%80-forwardRef-useImperativeHandle)

### <div id="export">5) scss :export </div>

SASS(SCSS)를 사용하면 CSS에서도 변수를 지정하고 사용할 수 있어서 편리하다. SASS(SCSS)에서 지정한 변수를 CSS말고도 js에서도 사용할 수 있도록 하는 기능이 존재하는데 바로 **:export**이다.

```scss
$primary-color: #333;

:export {
  primary-color: $primary-color;
}
```

```js
import styles from "./styles.scss";

console.log(styles["primary-color"]); // #333
```

---

<details>
<summary> 음악 자료들 출처  </summary>
<div markdown="1">

- 🎵 summer walk
  - [음악](https://pixabay.com/ko/users/olexy-25300778/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=152722)
  - [이미지](https://pixabay.com/ko/users/djn01002-733926/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=632100)
- 🎵 my universe
  - [음악](https://pixabay.com/ko/users/nesterouk-34392616/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=147152)
  - [이미지](https://pixabay.com/ko/users/geralt-9301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2643089)
- 🎵 leva

  - [음악](https://pixabay.com/ko/users/lemonmusicstudio-14942887/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=149473)
  - [이미지](https://pixabay.com/ko/users/freestocks-photos-7014431/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2943124)

- 🎵 unlock me
  - [음악](https://pixabay.com/ko/users/prazkhanal-24653570/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=149058)
  - [이미지](https://pixabay.com/ko/users/453169-453169/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=720589)
- 🎵 waterfall
  - [음악](https://pixabay.com/ko/users/romansenykmusic-11989248/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=140894)
  - [이미지](https://pixabay.com/ko/users/maryannandco-29130208/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7787024)

</div>
</details>
