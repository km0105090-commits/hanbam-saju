(function () {
  "use strict";

  /* ---------- 캐릭터 (이미지) ---------- */
  var IMG_HERO = "/media/hero.jpg", IMG_FACE = "/media/face.jpg";
  var VOX = { "hy_01_intro": "/media/hy_01_intro.mp3", "hy_02_thread": "/media/hy_02_thread.mp3", "hy_03_split": "/media/hy_03_split.mp3", "hy_04_eyes": "/media/hy_04_eyes.mp3", "hy_05_write": "/media/hy_05_write.mp3", "hy_r01a": "/media/hy_r01a.mp3", "hy_r01b": "/media/hy_r01b.mp3", "hy_r02a": "/media/hy_r02a.mp3", "hy_r02b": "/media/hy_r02b.mp3", "hy_r02c": "/media/hy_r02c.mp3", "hy_r03a": "/media/hy_r03a.mp3", "hy_r03b": "/media/hy_r03b.mp3", "hy_r04a": "/media/hy_r04a.mp3", "hy_r04b": "/media/hy_r04b.mp3", "hy_r04c": "/media/hy_r04c.mp3", "hy_r05b": "/media/hy_r05b.mp3", "hy_q01_name": "/media/hy_q01_name.mp3", "hy_q02_gender": "/media/hy_q02_gender.mp3", "hy_q03_birth": "/media/hy_q03_birth.mp3", "hy_q04_time": "/media/hy_q04_time.mp3", "hy_q05_pname_a": "/media/hy_q05_pname_a.mp3", "hy_q05_pname_b": "/media/hy_q05_pname_b.mp3", "hy_q06_pgender": "/media/hy_q06_pgender.mp3", "hy_q07_pbirth": "/media/hy_q07_pbirth.mp3", "hy_q08_ptime": "/media/hy_q08_ptime.mp3", "hy_q09_status_a": "/media/hy_q09_status_a.mp3", "hy_q09_status_b": "/media/hy_q09_status_b.mp3", "hy_q10_want": "/media/hy_q10_want.mp3", "hy_s1": "/media/hy_s1.mp3", "hy_s2": "/media/hy_s2.mp3", "hy_s3": "/media/hy_s3.mp3", "hy_s4": "/media/hy_s4.mp3", "hy_s5": "/media/hy_s5.mp3", "hy_res01": "/media/hy_res01.mp3", "hy_res02": "/media/hy_res02.mp3", "hy_res03": "/media/hy_res03.mp3", "hy_res04": "/media/hy_res04.mp3", "hy_res05": "/media/hy_res05.mp3", "hy_res06": "/media/hy_res06.mp3", "hy_b1": "/media/hy_b1.mp3", "hy_b2": "/media/hy_b2.mp3", "hy_b3": "/media/hy_b3.mp3", "hy_b4": "/media/hy_b4.mp3" };
  var VOXD = {"hy_01_intro":{"d":4.22,"s":[[0.0,0.7],[0.94,2.91],[3.15,4.14]]},"hy_02_thread":{"d":5.24,"s":[[0.03,1.8],[2.04,2.85],[3.09,4.31],[4.55,5.15]]},"hy_03_split":{"d":5.9,"s":[[0.03,2.46],[2.7,4.38],[4.62,5.0],[5.24,5.81]]},"hy_04_eyes":{"d":5.96,"s":[[0.03,1.23],[1.47,2.87],[3.11,3.68],[3.92,4.32],[4.56,5.87]]},"hy_05_write":{"d":4.68,"s":[[0.03,2.54],[2.78,3.33],[3.57,4.6]]},"hy_r01a":{"d":2.21,"s":[[0.03,0.55],[0.79,2.13]]},"hy_r01b":{"d":2.27,"s":[[0.03,0.37],[0.61,2.19]]},"hy_r02a":{"d":1.62,"s":[[0.03,0.91],[1.15,1.54]]},"hy_r02b":{"d":2.38,"s":[[0.03,2.3]]},"hy_r02c":{"d":2.38,"s":[[0.03,0.67],[0.91,2.3]]},"hy_r03a":{"d":1.93,"s":[[0.03,1.85]]},"hy_r03b":{"d":2.6,"s":[[0.03,0.69],[0.93,2.51]]},"hy_r04a":{"d":1.75,"s":[[0.03,0.54],[0.78,1.67]]},"hy_r04b":{"d":1.54,"s":[[0.03,1.45]]},"hy_r04c":{"d":1.47,"s":[[0.03,1.38]]},"hy_r05b":{"d":1.92,"s":[[0.03,0.7],[0.94,1.84]]},"hy_q01_name":{"d":3.05,"s":[[0.03,0.42],[0.66,1.62],[1.85,2.97]]},"hy_q02_gender":{"d":1.81,"s":[[0.03,0.91],[1.15,1.73]]},"hy_q03_birth":{"d":3.45,"s":[[0.03,1.15],[1.39,3.37]]},"hy_q04_time":{"d":3.84,"s":[[0.03,1.73],[1.97,2.53],[2.77,3.75]]},"hy_q05_pname_a":{"d":3.32,"s":[[0.03,0.42],[0.66,2.15],[2.38,3.23]]},"hy_q05_pname_b":{"d":4.78,"s":[[0.03,0.65],[0.89,1.85],[2.09,3.6],[3.84,4.69]]},"hy_q06_pgender":{"d":3.36,"s":[[0.03,0.5],[0.74,2.11],[2.35,3.27]]},"hy_q07_pbirth":{"d":2.72,"s":[[0.03,0.91],[1.15,2.63]]},"hy_q08_ptime":{"d":5.79,"s":[[0.03,0.9],[1.14,2.57],[2.81,4.13],[4.37,5.71]]},"hy_q09_status_a":{"d":4.5,"s":[[0.03,0.44],[0.68,2.5],[2.74,3.2],[3.44,4.41]]},"hy_q09_status_b":{"d":4.04,"s":[[0.03,1.0],[1.24,2.05],[2.29,2.74],[2.98,3.96]]},"hy_q10_want":{"d":2.45,"s":[[0.03,0.79],[1.03,2.37]]},"hy_s1":{"d":2.05,"s":[[0.03,1.97]]},"hy_s2":{"d":3.13,"s":[[0.03,1.56],[1.79,2.39],[2.63,3.04]]},"hy_s3":{"d":2.66,"s":[[0.03,0.83],[1.07,2.57]]},"hy_s4":{"d":2.29,"s":[[0.03,2.21]]},"hy_s5":{"d":3.12,"s":[[0.03,2.09],[2.32,3.03]]},"hy_res01":{"d":4.67,"s":[[0.03,0.68],[0.92,2.65],[2.89,3.55],[3.79,4.58]]},"hy_res02":{"d":8.16,"s":[[0.03,2.28],[2.52,4.75],[4.99,6.94],[7.18,8.08]]},"hy_res03":{"d":6.68,"s":[[0.03,2.45],[2.69,3.61],[3.85,6.59]]},"hy_res04":{"d":5.69,"s":[[0.03,2.57],[2.81,5.61]]},"hy_res05":{"d":2.05,"s":[[0.03,1.97]]},"hy_res06":{"d":7.0,"s":[[0.03,1.33],[1.57,3.42],[3.66,5.39],[5.63,6.91]]},"hy_b1":{"d":1.09,"s":[[0.03,1.0]]},"hy_b2":{"d":1.42,"s":[[0.03,1.33]]},"hy_b3":{"d":1.83,"s":[[0.03,0.48],[0.72,1.74]]},"hy_b4":{"d":1.57,"s":[[0.03,1.57]]}};
  var IMG = { "/media/life-hero.jpg": "/media/life-hero.jpg", "/media/life-face.jpg": "/media/life-face.jpg", "/media/l-map.jpg": "/media/l-map.jpg", "/media/l-river.jpg": "/media/l-river.jpg", "/media/l-scroll.jpg": "/media/l-scroll.jpg", "/media/m-hero.jpg": "/media/m-hero.jpg", "/media/m-hero-c.jpg": "/media/m-hero-c.jpg", "/media/m-face.jpg": "/media/m-face.jpg", "/media/m-hold.jpg": "/media/m-hold.jpg", "/media/m-split.jpg": "/media/m-split.jpg", "/media/m-eyes.jpg": "/media/m-eyes.jpg", "/media/m-eyes-c.jpg": "/media/m-eyes-c.jpg", "/media/m-write.jpg": "/media/m-write.jpg", "/media/m-porch.jpg": "/media/m-porch.jpg", "/media/m-letter.jpg": "/media/m-letter.jpg", "/media/n-hero.jpg": "/media/n-hero.jpg", "/media/n-face.jpg": "/media/n-face.jpg", "/media/n-stars.jpg": "/media/n-stars.jpg", "/media/n-letters.jpg": "/media/n-letters.jpg", "/media/n-gaze.jpg": "/media/n-gaze.jpg", "/media/n-desk.jpg": "/media/n-desk.jpg", "/media/n-letter.jpg": "/media/n-letter.jpg" };
  document.getElementById("heroImg").src = IMG_HERO;
  document.querySelectorAll(".scene-line img").forEach(function (im) { im.src = IMG_FACE; });
  function iga(w) { var c = w.charCodeAt(w.length - 1) - 0xac00; return w + (c >= 0 && c < 11172 && c % 28 ? "이" : "가"); }
  function dali(extra) { return '<span class="dali ' + (extra || '') + '"><img src="' + PRODS[CUR].face + '" alt=""></span>'; }


  /* ---------- 상품 설정: 연애사주 / 인생사주 ---------- */
  var CUR = "love";
  var PRODS = {
    love: {
      title: "연애사주", who: "한결", price: "29,900원", face: IMG_FACE, hero: IMG_HERO, mode: 0, petals: 7,
      heroAlt: "검은 한복을 입고 놋쇠 나침반을 든 안내자 한결",
      lines: ["그대의 2027년, 열두 달 중\n인연이 가장 가까이 오는 달은\n따로 있습니다."],
      q: ["그대를 어떻게 부르면 될까요?", function (n) { return n + "님, 태어난 날을 알려 주십시오."; }, "태어난 시간은요? 몰라도 괜찮습니다.", "마지막으로, 가장 궁금한 것 하나만."],
      wants: ["인연은 언제쯤 올까", "나랑 잘 맞는 사람은", "지금 관계의 앞날", "내 연애 패턴과 습관"], defWant: "인연은 언제쯤 올까",
      samples: [
        "당신은 마음을 늦게 여는 대신, 한번 열면 오래 머무는 사람입니다. 그래서 설렘보다 확신이 먼저 필요하죠.",
        "올해 하반기는 새로운 사람보다, 이미 알던 사람과의 거리가 달라지기 쉬운 흐름이에요.",
        "상대의 말보다 행동의 온도를 보세요. 당신의 사주는 그걸 읽어 내는 감각이 좋은 편이니까."],
      toc: [[1, "한눈에 보는 핵심 요약", true], [2, "사주팔자 구성", true], [3, "오행 균형", true], [4, "타고난 성격과 기질"], [5, "십성으로 보는 관계·일·돈"], [6, "연애운의 흐름"], [7, "올해와 앞으로 10년의 흐름"], [8, "2027년 열두 달 인연 달력"], [9, "실생활 조언"], [10, "궁금한 점에 대한 한결의 답"], [11, "마무리 편지", true]],
      reviews: [
        ["ha***", "을묘일주 · 20대 후반", 5, "제가 왜 늘 비슷한 사람에게 끌리는지 설명해 줘서 좋았어요. 겁주는 말이 없어서 마음 편하게 읽었어요."],
        ["so***", "경신일주 · 30대 초반", 5, "태어난 시간을 몰라서 걱정했는데 여섯 글자로도 꽤 자세히 나왔어요. 실생활 조언 체크리스트는 캡처해 뒀어요."],
        ["yu***", "계해일주 · 20대 초반", 4, "말투가 친구처럼 편해요. 마지막에 제가 고른 질문에 따로 답해 준 부분이 제일 좋았어요."]],
      thumb: "/media/s-thread.jpg"
    },
    life: {
      title: "인생사주", who: "백운 선생", price: "44,900원", face: IMG["/media/life-face.jpg"], hero: IMG["/media/life-hero.jpg"], mode: 1, petals: 0,
      heroAlt: "갓을 쓰고 부채를 든 백발의 선비 백운 선생",
      lines: ["살다 보면 내 뜻대로 안 풀려\n가슴 칠 때가 많지.\n허나 자네 탓만은 아니네."],
      q: ["자네를 뭐라 부르면 되겠나?", function (n) { return n + ", 태어난 날을 일러 주게."; }, "태어난 시각은 아는가? 몰라도 괜찮네.", "마지막으로, 삶에서 가장 궁금한 것 하나만 골라 보게."],
      wants: ["내 인생의 전성기는 언제", "나에게 맞는 일과 길", "재물이 모이는 흐름", "앞으로 10년의 방향"], defWant: "앞으로 10년의 방향",
      samples: [
        "자네는 처음엔 느려 보여도 한번 뿌리를 내리면 오래 버티는 나무일세. 서두를수록 손해 보는 사주라네.",
        "지금 대운은 씨를 뿌리는 물길이네. 거둘 때는 다음 십 년에 오니 조급해하지 말게.",
        "재물은 크게 한 번보다 꾸준히 모일 때 머무는 결이야. 작은 습관 하나가 큰 둑이 되네."],
      toc: [[1, "한눈에 보는 핵심 요약", true], [2, "사주팔자 구성", true], [3, "오행 균형", true], [4, "타고난 성격과 그릇"], [5, "십성으로 보는 관계·일·돈"], [6, "일과 재물의 길"], [7, "10년 대운 타임라인"], [8, "인생의 계절별 조언"], [9, "실생활 조언"], [10, "궁금한 점에 대한 백운 선생의 답"], [11, "마무리 서찰", true]],
      reviews: [
        ["ji***", "갑진일주 · 40대 초반", 5, "지금 대운이 어디쯤인지 알고 나니 조급함이 많이 줄었어요. 10년 타임라인은 출력해서 붙여 뒀어요."],
        ["mo***", "정유일주 · 30대 후반", 5, "할아버지가 이야기해 주듯 편하게 읽혀요. 무섭게 단정하지 않아서 좋았어요."],
        ["se***", "무오일주 · 50대 초반", 4, "일과 재물 장이 특히 구체적이었어요. 부모님 것도 하나 더 볼 생각이에요."]],
      thumb: "/media/l-map.jpg",
      head: '<span class="eyebrow">백운 선생의 평생 사주 풀이</span><h1>인생사주</h1>' +
        '<p class="lede">태어날 때 쥐고 나온 인생의 지도부터 10년마다 바뀌는 대운의 물길까지. 여덟 글자에 담긴 평생의 흐름을 백운 선생이 한 장씩 펼쳐 드려요.</p>' +
        '<div class="meta-row"><span>11개 장</span><span>웹 + PDF</span><span>10년 대운 타임라인</span></div>',
      learn: [["타고난 그릇과 기질", "어떤 일에 힘이 붙고 어디서 쉽게 지치는지, 일간과 오행의 균형으로 짚어요."],
        ["10년마다 바뀌는 대운의 물길", "지금 어느 대운 위에 서 있는지, 다음 물길은 언제 어떤 결로 바뀌는지 타임라인으로 보여 드려요."],
        ["힘을 뺄 때와 돛을 올릴 때", "일, 재물, 관계마다 밀어붙이기 좋은 시기와 쉬어 가면 좋은 시기를 나눠요. 날짜를 단정하지는 않아요."]],
      fx: '<span class="book-glow"></span>',
      film: '<section class="scene sc-lmap sc-long"><div class="frame tall"><img src="' + IMG["/media/l-map.jpg"] + '" alt="별자리 지도를 부채로 짚는 백운 선생"><span class="map-glow"></span><span class="twinkle"><i style="left:18%;top:82%;animation-delay:0s"></i><i style="left:27%;top:88%;animation-delay:0.7s"></i><i style="left:36%;top:80%;animation-delay:1.4s"></i><i style="left:44%;top:90%;animation-delay:0.3s"></i><i style="left:52%;top:84%;animation-delay:2.1s"></i><i style="left:60%;top:92%;animation-delay:1.1s"></i><i style="left:33%;top:94%;animation-delay:1.8s"></i><i style="left:48%;top:78%;animation-delay:2.6s"></i><i style="left:22%;top:93%;animation-delay:0.9s"></i></span></div>' +
          '<div class="cap"><p class="big" data-line="사람마다 태어날 때 쥐고 나온 &#39;인생의 지도&#39;와 10년마다 바뀌는 &#39;큰 물길(대운)&#39;이 따로 있는 법이거든.">사람마다 태어날 때 쥐고 나온 \'인생의 지도\'와 10년마다 바뀌는 \'큰 물길(대운)\'이 따로 있는 법이거든.</p></div></section>' +
        '<section class="scene sc-lriver"><div class="frame tall"><img src="' + IMG["/media/l-river.jpg"] + '" alt="달빛 아래 강을 내려다보는 백운 선생의 뒷모습"><span class="moon-glow lr-moon"></span><span class="river-shine"></span><span class="glints"><i style="left:74%;top:58%;animation-delay:0s"></i><i style="left:80%;top:63%;animation-delay:0.6s"></i><i style="left:70%;top:68%;animation-delay:1.2s"></i><i style="left:84%;top:71%;animation-delay:0.4s"></i><i style="left:77%;top:76%;animation-delay:1.6s"></i><i style="left:88%;top:60%;animation-delay:2.0s"></i><i style="left:66%;top:73%;animation-delay:0.9s"></i></span></div>' +
          '<div class="cap"><p class="big" data-line="어디서 힘을 빼고, 어느 시기에 돛을 올려야 할지.">어디서 힘을 빼고, 어느 시기에 돛을 올려야 할지.</p></div></section>' +
        '<section class="scene sc-reach sc-lscroll sc-long"><div class="frame tall"><img src="' + IMG["/media/l-scroll.jpg"] + '" alt="붉은 매듭의 서찰을 건네는 백운 선생"><span class="scroll-glow"></span><span class="seal-glint"></span><span class="l-dust"></span></div>' +
          '<div class="cap"><p class="big" data-line="이 늙은이가 수십 쪽의 서찰(PDF)로 낱낱이 짚어 주겠네.">이 늙은이가 수십 쪽의 서찰(PDF)로 낱낱이 짚어 주겠네.</p><p class="small">생년월일만 있으면 되네. 태어난 시각은 몰라도 괜찮네.</p>' +
          '<button class="btn scene-cta" type="button" data-scroll="quick">지금 바로 시작하기</button></div></section>'
    }
  };
  PRODS.match = {
    title: "궁합사주", who: "홍연", price: "34,900원", face: IMG["/media/m-face.jpg"], hero: IMG["/media/m-hero.jpg"], mode: 2, petals: 6,
    heroAlt: "붉은 저고리에 금빛 꽃비녀를 꽂은 안내자 홍연",
    lines: ["누구 생각하면서\n이 화면 열었는지 알 것 같은데."],
    q: PRODS.love.q,
    wants: ["우리 사이의 앞날", "잘 맞는 점과 부딪히는 점", "이 사람이 내 인연일까", "지금 내가 해야 할 일"], defWant: "우리 사이의 앞날",
    samples: PRODS.love.samples, reviews: PRODS.love.reviews, thumb: "/media/m-hold.jpg",
    toc: [[1, "한눈에 보는 두 사람", true], [2, "두 사람의 사주팔자", true], [3, "합쳐 본 오행", true], [4, "두 사람의 기질 비교"], [5, "끌림과 부딪힘"], [6, "관계의 흐름"], [7, "두 사람의 2027년"], [8, "오래 가는 법"], [9, "그 사람 마음을 여는 말"], [10, "궁금한 점에 대한 홍연의 답"], [11, "마무리 편지", true]]
  };
  PRODS.newyear = {
    title: "2027 신년운세", who: "연지", price: "29,900원", face: IMG["/media/n-face.jpg"], hero: IMG["/media/n-hero.jpg"], mode: 3, petals: 0,
    heroAlt: "달항아리 곁에서 천문 두루마리를 든 궁중 일관 연지",
    lines: ["올해도 오셨군요.\n2027년, 당신의 해는\n이미 다 읽어 두었습니다."],
    q: PRODS.love.q,
    wants: ["가장 좋은 달은 언제일까", "쉬어 가야 할 달과 이유", "2027년 재물의 흐름", "2027년 인연과 관계"], defWant: "가장 좋은 달은 언제일까",
    samples: PRODS.love.samples, reviews: PRODS.love.reviews, thumb: "/media/n-letters.jpg",
    toc: [[1, "정미년과 당신", true], [2, "사주팔자 구성", true], [3, "분야별 흐름", true], [4, "열두 달 운세 달력"], [5, "재물운"], [6, "인연과 관계"], [7, "일과 진로"], [8, "건강과 컨디션"], [9, "행운의 색과 방향"], [10, "궁금한 점에 대한 연지의 답"], [11, "연지의 덕담 편지", true]]
  };
  var ORIG = {};
  document.querySelectorAll(".face-img").forEach(function (im) { im.src = IMG_FACE; });
  function PR() { return PRODS[CUR]; }
  function applyProduct(id) {
    if (!ORIG.film) { ["film", "heroFx", "pHead", "pLearn"].forEach(function (k) { ORIG[k] = document.getElementById(k).innerHTML; }); }
    var changed = CUR !== id; CUR = id; var C = PR();
    document.getElementById("pTitle").textContent = C.title;
    document.getElementById("v-intro").setAttribute("aria-label", C.title);
    document.getElementById("qWho").textContent = C.who;
    document.querySelectorAll(".price-now").forEach(function (el) { el.textContent = C.price; });
    document.querySelectorAll(".face-img").forEach(function (im) { im.src = C.face; });
    document.getElementById("film").innerHTML = C.film || ORIG.film;
    document.getElementById("heroFx").innerHTML = C.fx || ORIG.heroFx;
    document.getElementById("pHead").innerHTML = C.head || ORIG.pHead;
    document.getElementById("pLearn").innerHTML = C.learn ? C.learn.map(function (l, i) {
      return '<div class="learn-item"><div class="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="#f3dda6" stroke-width="1.6" stroke-linecap="round">' +
        ['<path d="M5 20V9l7-5 7 5v11"/><path d="M9 20v-6h6v6"/>', '<path d="M3 15c3-3 6 3 9 0s6 3 9 0"/><path d="M3 10c3-3 6 3 9 0s6 3 9 0"/>', '<path d="M12 3v18"/><path d="M12 5l7 9H12"/><path d="M5 19h14"/>'][i] +
        '</svg></div><div><h3>' + l[0] + '</h3><p>' + l[1] + '</p></div></div>'; }).join("") : ORIG.pLearn;
    var img = document.getElementById("heroImg");
    img.alt = C.heroAlt;
    if (img.getAttribute("src") !== C.hero) img.src = C.hero;
    document.querySelectorAll(".scene img[data-src]").forEach(function (im) { im.src = IMG_SCENES[im.dataset.src]; });
    document.querySelectorAll("#film [data-scroll]").forEach(function (b) { b.addEventListener("click", scrollToQuick); });
    HERO_LINES = C.lines;
    renderProdLists();
    if (changed) { q = { step: 0, d: { cal: "양력" } }; qBody.innerHTML = ""; }
  }

  /* ---------- 공통 데이터 ---------- */
  var LOCK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

  /* ---------- 상품 소개 ---------- */
  var heroDali = null;
  function renderProdLists() {
    var C = PR(), avaHTML = '<div class="ava">' + dali() + '</div>';
    document.getElementById("samples").innerHTML = C.samples.map(function (x) {
      return '<div class="say">' + avaHTML + '<div class="say-bubble"><span class="tag-mini">예시 문장</span><br>' + x + '</div></div>';
    }).join("");
    document.getElementById("toc").innerHTML = C.toc.map(function (t) {
      return '<li><span class="no">' + String(t[0]).padStart(2, "0") + '</span><span class="tt">' + t[1] + '</span>' +
        (t[2] ? '<span class="badge free">무료</span>' : '<span class="badge lock">' + LOCK_SVG + '잠금</span>') + '</li>';
    }).join("");
    document.getElementById("reviews").innerHTML = C.reviews.map(function (r) {
      return '<article class="review"><div class="review-top"><span class="stars" aria-label="별점 ' + r[2] + '점">' +
        "★★★★★".slice(0, r[2]) + '<span style="opacity:.3">' + "★★★★★".slice(r[2]) + '</span></span>' +
        '<span>' + r[0] + '</span><span class="pillar-tag">' + r[1] + '</span><span class="tag-mini" style="margin:0">예시</span></div><p>' + r[3] + '</p></article>';
    }).join("");
  }

  /* 말풍선 타이핑 */
  var HERO_LINES = ["그대의 2027년, 열두 달 중\n인연이 가장 가까이 오는 달은\n따로 있습니다."];
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var typeTimer = null;
  /* 한 글자씩 타이핑. 탭하면 바로 끝까지 */
  function typeInto(el, line, speed, done) {
    var ci = 0, timer = null, finished = false;
    function finish() { if (finished) return; finished = true; clearTimeout(timer); el.textContent = line; done && done(); }
    if (reduce) { finish(); return finish; }
    (function tick() { el.textContent = line.slice(0, ++ci); if (ci < line.length) timer = setTimeout(tick, speed); else finish(); })();
    return finish;
  }
  /* 영상처럼 자동 재생되는 자막: 한 줄씩 떠오르고 사라짐, 탭하면 다음 줄 */
  var subLine = document.getElementById("subLine"), segs = document.querySelectorAll(".subs-prog i"), subIdx = 0;
  function playSub(i) {
    clearTimeout(typeTimer);
    subIdx = i % HERO_LINES.length;
    var line = HERO_LINES[subIdx], step = 34, html = "";
    for (var c = 0; c < line.length; c++) {
      if (line[c] === "\n") { html += "<br>"; continue; }
      var ch = line[c] === " " ? " " : esc(line[c]);
      html += '<span class="ch" style="animation-delay:' + (c * step) + 'ms">' + ch + '</span>';
    }
    var dur = line.length * step + 900 + (subIdx === HERO_LINES.length - 1 ? 3800 : 2600);
    subLine.classList.remove("out");
    subLine.innerHTML = '<span class="inner">' + html + '</span>';
    segs.forEach(function (sg, k) {
      sg.classList.toggle("done", k < subIdx); sg.classList.remove("now");
      if (k === subIdx) { void sg.offsetWidth; sg.style.setProperty("--dur", dur + "ms"); sg.classList.add("now"); }
    });
    if (HERO_LINES.length === 1) return;
    typeTimer = setTimeout(function () {
      subLine.classList.add("out");
      typeTimer = setTimeout(function () { playSub(subIdx + 1); }, subIdx === HERO_LINES.length - 1 ? 1100 : 700);
    }, dur);
  }
  function runHeroBubble() {
    if (reduce) { subLine.textContent = HERO_LINES[0].replace("\n", " "); return; }
    playSub(0);
  }
  

  /* 스크롤 장면: 화면에 들어오면 컷이 다가오고 자막이 한 자씩 떠오름 */
  var IMG_SCENES = { "/media/s-eyes.jpg": "/media/s-eyes.jpg", "/media/s-thread.jpg": "/media/s-thread.jpg", "/media/s-moon.jpg": "/media/s-moon.jpg", "/media/s-reach.jpg": "/media/s-reach.jpg" };
  document.querySelectorAll(".scene img[data-src]").forEach(function (im) { im.src = IMG_SCENES[im.dataset.src]; });
  var filmObs = null, filmScroll = null;
  function setupFilm() {
    var scenes = document.querySelectorAll(".scene");
    if (reduce || !("IntersectionObserver" in window)) { scenes.forEach(function (sc) { sc.classList.add("on"); }); return; }
    scenes.forEach(function (sc) {
      var big = sc.querySelector(".big"), line = big.dataset.line, h = "";
      h = '<span style="white-space:nowrap">';
      for (var c = 0; c < line.length; c++) h += line[c] === " " ? '</span> <span style="white-space:nowrap">' : '<span class="ch" style="animation-delay:' + (300 + c * 45) + 'ms">' + esc(line[c]) + '</span>';
      h += '</span>';
      big.innerHTML = h;
      sc.style.setProperty("--after", (0.5 + line.length * 0.045 + 0.4).toFixed(2) + "s");
      sc.classList.remove("on"); sc.classList.add("arm");
    });
    if (filmObs) filmObs.disconnect();
    filmObs = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("on"); filmObs.unobserve(en.target); } });
    }, { threshold: .45 });
    scenes.forEach(function (sc) { filmObs.observe(sc); });
    if (!filmScroll) {
      var ticking = false;
      filmScroll = function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          var vh = window.innerHeight;
          document.querySelectorAll(".scene").forEach(function (sc) {
            var r = sc.getBoundingClientRect();
            if (r.bottom < 0 || r.top > vh) return;
            sc.style.setProperty("--p", ((vh / 2 - (r.top + r.height / 2)) / vh).toFixed(3));
          });
        });
      };
      window.addEventListener("scroll", filmScroll, { passive: true });
    }
  }


  /* ---------- 버튼으로 넘기는 장면 ---------- */
  var STORY = [
    { line: "그대, [[○○월]]에\n연애가 시작될 흐름입니다.", btn: "정말입니까?" },
    { line: "요즘 쉽게 마음을 안 여는 건\n[[○○○]] 때문입니다.", btn: "어떻게 아십니까?" },
    { line: "위로는 충분히 들으셨겠죠.\n저는 그대의 달을 짚어 드립니다.", btn: "내 달 확인하기", promises: [
      ["몇 월인지 짚어 드립니다", "“곧 좋은 인연이 온다” 같은 말 대신, 열두 달 중 흐름이 짙은 달을 짚어요."],
      ["지난 연애부터 읽어 드립니다", "왜 지쳤는지, 어디서 엇갈렸는지 사주로 먼저 풀어요."],
      ["다가가는 법까지 드립니다", "다가올 사람의 결과, 그 사람과 가까워지는 방법까지."]] }
  ];
  var stI = 0, stTimer = null;
  function storyLineHTML(t) {
    var h = "", k = 0, parts = t.split(/(\[\[.*?\]\])/);
    parts.forEach(function (pt) {
      if (/^\[\[/.test(pt)) { h += '<span class="hid"><span class="ch" style="animation-delay:' + (200 + k++ * 38) + 'ms">' + esc(pt.slice(2, -2)) + '</span></span>'; return; }
      pt.split("\n").forEach(function (ln, li) {
        if (li) h += "<br>";
        ln.split(" ").forEach(function (w, wi) {
          if (wi) h += " ";
          h += '<span style="white-space:nowrap">';
          for (var c = 0; c < w.length; c++) h += '<span class="ch" style="animation-delay:' + (200 + k++ * 38) + 'ms">' + esc(w[c]) + '</span>';
          h += '</span>';
        });
      });
    });
    return { html: h, ms: 200 + k * 38 };
  }
  function storyGo(i) {
    var st = document.getElementById("story"); if (!st) return;
    stI = i; var S = STORY[i];
    st.querySelectorAll(".st-layer").forEach(function (l, j) { l.classList.toggle("on", j === i); });
    st.classList.toggle("st-last", !!S.promises);
    st.querySelectorAll(".st-dots i").forEach(function (d, j) { d.classList.toggle("on", j === i); });
    var r = storyLineHTML(S.line);
    document.getElementById("stLine").innerHTML = r.html;
    var ex = document.getElementById("stExtra");
    ex.innerHTML = S.promises ? S.promises.map(function (pm, j) {
      return '<div class="promise" style="animation-delay:' + (r.ms + 150 + j * 160) + 'ms"><span class="n">0' + (j + 1) + '</span><b>' + pm[0] + '</b><span>' + pm[1] + '</span></div>'; }).join("") : "";
    var nb = document.getElementById("stNext");
    nb.textContent = S.btn; nb.classList.remove("show");
    document.getElementById("stSkip").hidden = i === STORY.length - 1;
    clearTimeout(stTimer);
    stTimer = setTimeout(function () { nb.classList.add("show"); }, reduce ? 0 : r.ms + (S.promises ? 650 : 250));
  }
  function setupStory() {
    var st = document.getElementById("story"); if (!st) return;
    st.querySelectorAll("img[data-src]").forEach(function (im) { im.src = IMG_SCENES[im.dataset.src]; });
    document.getElementById("stNext").onclick = function () {
      if (stI < STORY.length - 1) { storyGo(stI + 1); var top = st.getBoundingClientRect().top; if (Math.abs(top) > 4) window.scrollBy({ top: top, behavior: "smooth" }); }
      else scrollToQuick();
    };
    document.getElementById("stSkip").onclick = scrollToQuick;
    storyGo(0);
  }


  /* ---------- 장면 전환형 흐름 (연애사주·인생사주 공통) ---------- */
  var FL = { i: 0, d: { cal: "양력" }, busy: false, bubT: null, nextT: null };
  function promiseHTML(list) { return '<div class="fl-promise">' + list.map(function (x, j) { return '<div><span class="n">0' + (j + 1) + '</span><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join("") + '</div>'; }
  var FLOW = {
    love: {
      who: "한결", layers: [["thread", "/media/s-thread.jpg"], ["moon", "/media/s-moon.jpg"], ["reach", "/media/s-reach.jpg"]],
      bubbles: ["1분이면 끝납니다", "태어난 시간을 몰라도 괜찮습니다", "그대의 달은 몇 월일까요?", "지난 연애, 왜 그렇게 지쳤을까요?"],
      intro: [
        { bg: "hero", eyebrow: "한결의 연애사주", line: "잠깐.\n그대가 오늘 이 화면을 연 건\n우연이 아닙니다.", choices: [{"t": "요즘 좀 외로워서요", "k": "계기", "v": "외로움", "say": "외로움이 길었군요. 그 이유부터 짚어 보죠."}, {"t": "그냥 궁금해서요", "k": "계기", "v": "호기심", "say": "궁금하다는 것도 인연이 보내는 신호입니다."}, {"t": "누가 생각나서요", "k": "계기", "v": "마음에 둔 사람", "say": "역시. 이미 마음에 둔 사람이 있군요."}] },
        { bg: "thread", line: "그대의 2027년에는\n붉은 실이 당겨지는 달이 따로 있습니다.\n그게 [[○○월]]인데…", choices: [{"t": "올해 안이면 좋겠어요", "k": "바라는 시기", "v": "빨리", "say": "서두르는 마음, 이해합니다."}, {"t": "늦어도 돼요, 제대로만", "k": "바라는 시기", "v": "늦어도 제대로", "say": "제대로 된 인연을 원하시는군요. 좋습니다."}] },
        { bg: "moon", line: "그 전에 하나만 짚죠.\n요즘 쉽게 마음을 안 여는 건\n[[○○○○]] 때문입니다.", choices: [{"t": "지난 연애 때문인가요?", "k": "마음이 닫힌 이유", "v": "지난 연애의 상처", "say": "지난 연애가 남긴 게 생각보다 큽니다."}, {"t": "제가 눈이 높은 걸까요?", "k": "마음이 닫힌 이유", "v": "높은 기준", "say": "눈이 높은 게 아니라, 결이 맞는 사람을 아직 못 만났을 뿐입니다."}, {"t": "바빠서 여유가 없어요", "k": "마음이 닫힌 이유", "v": "여유 부족", "say": "여유가 없을 때도 실은 움직입니다."}] },
        { bg: "reach", line: "위로는 충분히 들으셨을 겁니다.\n저는 그대의 달을 짚어 드리죠.\n단, 생일이 필요합니다.", choices: [{"t": "생일 알려 줄게요", "k": "마음가짐", "v": "적극적", "say": ""}, {"t": "솔직히 반신반의예요", "k": "마음가짐", "v": "반신반의", "say": "의심해도 괜찮습니다. 결과가 말해 줄 테니까요."}],
          body: [["몇 월인지 짚어 드립니다", "“곧 좋은 인연이 온다” 대신, 열두 달 중 흐름이 짙은 달을."], ["지난 연애부터 읽어 드립니다", "왜 지쳤는지, 어디서 엇갈렸는지 사주로 먼저."], ["다가가는 법까지 드립니다", "다가올 사람의 결과, 그 사람과 가까워지는 방법까지."]] }
      ],
      q: {
        name: "좋습니다. 먼저,\n그대를 어떻게 부르면 될까요?",
        gender: function (n) { return n + "님… 이름에서 벌써 결이 느껴집니다.\n성별을 알려 주십시오."; },
        birth: function (n) { return "이제 가장 중요한 걸 묻겠습니다.\n" + n + "님, 태어난 날이 언제입니까?"; },
        time: function (me) { return me + " 일간… 역시 그랬군요.\n태어난 시간을 알면 더 선명해집니다."; },
        timeOk: function (sj) { return sj + "시. 여덟 글자가 모두 섰습니다."; }, timeNo: "괜찮습니다. 여섯 글자로도 보입니다.",
        status: "지금 그대의 연애는 어떤 모습입니까?",
        want: "마지막입니다. 가장 알고 싶은 것 하나만."
      },
      status: ["혼자인 지 꽤 됐어요", "썸 타는 중이에요", "연애 중이에요", "헤어진 지 얼마 안 됐어요", "말하기 애매해요"],
      statusSay: ["혼자였던 시간이 길었다면, 그 이유가 사주에 보입니다.", "마음이 한쪽으로 기울고 있군요.", "지금 곁에 있는 사람과의 흐름도 함께 보겠습니다.", "지난 매듭부터 천천히 풀어 보죠.", "애매하다는 것도 하나의 흐름입니다."]
    },
    life: {
      who: "백운 선생", layers: [["map", "/media/l-map.jpg"], ["river", "/media/l-river.jpg"], ["scroll", "/media/l-scroll.jpg"]],
      bubbles: ["1분이면 끝나네", "태어난 시각을 몰라도 괜찮네", "자네의 갈림길은 몇 살일까?", "지금은 몇 번째 굽이일까?"],
      intro: [
        { bg: "hero", eyebrow: "백운 선생의 인생사주", line: "살다 보면 내 뜻대로 안 풀려\n가슴 칠 때가 많지.\n허나 자네 탓만은 아니네.", choices: [{"t": "요즘 일이 안 풀려요", "k": "요즘 고민", "v": "일", "say": "일이 막혔구먼. 그 막힘에도 이유가 있네."}, {"t": "사람 때문에 힘들어요", "k": "요즘 고민", "v": "사람", "say": "사람 일이 제일 무겁지."}, {"t": "앞날이 막막해요", "k": "요즘 고민", "v": "막막함", "say": "막막할 땐 지도부터 펴는 법이네."}] },
        { bg: "map", line: "사람마다 쥐고 나온 지도가 있네.\n자네 지도엔 [[○○세]] 무렵\n큰 갈림길이 하나 그려져 있지.", choices: [{"t": "벌써 지났을까요?", "k": "갈림길", "v": "지났을까 불안", "say": "지났는지 아닌지, 그것부터 보세."}, {"t": "아직이면 좋겠어요", "k": "갈림길", "v": "아직이길 기대", "say": "기다리는 마음이 있다는 건 좋은 징조일세."}] },
        { bg: "river", line: "그리고 물길은 10년마다 바뀌네.\n지금 자네는 그 물길의\n[[○○번째]] 굽이를 지나는 중이고.", choices: [{"t": "지금은 버티는 중이에요", "k": "지금 상태", "v": "버티는 중", "say": "버티는 것도 실력이네."}, {"t": "뭔가 바꾸고 싶어요", "k": "지금 상태", "v": "변화를 원함", "say": "바꾸고 싶을 때가 물길이 바뀌는 때이기도 하지."}, {"t": "잘 모르겠어요", "k": "지금 상태", "v": "잘 모름", "say": "모르는 게 당연하네. 그래서 짚어 주는 걸세."}] },
        { bg: "scroll", line: "그건 말로 다 못 하네.\n자네 생일을 일러 주면\n서찰에 낱낱이 적어 주겠네.", choices: [{"t": "생일 일러 드릴게요", "k": "마음가짐", "v": "적극적", "say": ""}, {"t": "정말 맞을까요?", "k": "마음가짐", "v": "반신반의", "say": "맞고 틀리고보다, 자네가 쓸 수 있는 지도인지가 중요하네."}],
          body: [["대운의 굽이를 짚어 주네", "10년마다 바뀌는 물길이 언제, 어떤 결로 바뀌는지."], ["힘 뺄 때와 돛 올릴 때를 나누네", "일, 재물, 관계마다 밀어붙일 시기와 쉬어 갈 시기."], ["타고난 그릇을 읽어 주네", "어디서 힘이 붙고, 어디서 쉽게 지치는지."]] }
      ],
      q: {
        name: "좋네. 먼저,\n자네를 뭐라 부르면 되겠나?",
        gender: function (n) { return n + "… 이름이 단단하군.\n성별을 일러 주게."; },
        birth: function (n) { return "이제 가장 중요한 걸 묻겠네.\n" + n + ", 태어난 날이 언제인가?"; },
        time: function (me) { return me + " 일간이라… 그래서였군.\n태어난 시각도 아는가?"; },
        timeOk: function (sj) { return sj + "시. 여덟 글자가 다 섰네."; }, timeNo: "괜찮네. 여섯 글자로도 보이네.",
        status: "요즘 자네 삶은 어떤가?",
        want: "마지막일세. 가장 알고 싶은 것 하나만 골라 보게."
      },
      status: ["일이 막혀 답답해요", "새 출발을 앞두고 있어요", "돈 문제가 가장 커요", "사람 때문에 지쳤어요", "그럭저럭 무난해요"],
      statusSay: ["막힌 물길도 굽이를 돌면 트이는 법이네.", "돛을 올리기 전엔 바람부터 읽어야 하지.", "재물은 들어오는 때와 지키는 때가 따로 있네.", "사람의 인연에도 물때가 있다네.", "무난할 때가 다음 물길을 준비하기 좋은 때일세."]
    }
  };
  FLOW.match = {
    who: "홍연", layers: [["hold", "/media/m-hold.jpg"], ["split", "/media/m-split.jpg"], ["eyes", "/media/m-eyes.jpg", "/media/m-eyes-c.jpg"], ["write", "/media/m-write.jpg"], ["porch", "/media/m-porch.jpg"]],
    bubbles: ["1분이면 끝나요", "그 사람 생일만 알면 돼요", "두 사람, 어디서 엇갈릴까요?", "이 실, 이어질까요?"],
    intro: [
      { bg: "hero", eyebrow: "홍연의 궁합사주", vo: "hy_01_intro", line: "왔네요.\n누구 생각하면서 이 화면 열었는지,\n저는 알 것 같은데.", choices: [{"t": "네… 맞아요", "k": "계기", "v": "마음에 둔 사람", "say": "역시. 표정에 다 쓰여 있었어요.", "vo": "hy_r01a"}, {"t": "아닌데요?", "k": "계기", "v": "아니라고 함", "say": "그래요? 그럼 왜 귀가 빨개졌을까.", "vo": "hy_r01b"}] },
      { bg: "hold", vo: "hy_02_thread", line: "두 사람 사이엔 실이 하나 있어요.\n근데 이 실, 지금\n[[○○○]] 상태예요.", choices: [{"t": "팽팽했으면 좋겠어요", "k": "바라는 것", "v": "가까워지길", "say": "당기고 싶군요. 좋아요.", "vo": "hy_r02a"}, {"t": "끊어질까 봐 무서워요", "k": "바라는 것", "v": "끊어질까 불안", "say": "겁나는 건, 그만큼 소중하단 뜻이에요.", "vo": "hy_r02b"}, {"t": "그냥 확인만 할래요", "k": "바라는 것", "v": "확인만", "say": "쿨하네요. 그런 사람이 더 궁금하던데.", "vo": "hy_r02c"}] },
      { bg: "split", vo: "hy_03_split", line: "보통 이쯤에서 실이 두 갈래로 갈라져요.\n이유는 둘 중 한 사람의\n[[○○○○]] 때문이고요.", choices: [{"t": "제 탓일까 봐 걱정돼요", "k": "갈라지는 이유", "v": "내 탓일까 걱정", "say": "자책부터 하는 사람이네요, 당신.", "vo": "hy_r03a"}, {"t": "그 사람 쪽이겠죠", "k": "갈라지는 이유", "v": "상대 쪽이라 생각", "say": "그럴 수도요. 근데 결과 보고 놀라지 마요.", "vo": "hy_r03b"}] },
      { bg: "eyes", vo: "hy_04_eyes", line: "그건 아직 말 못 해요.\n대신 하나만 알려 줄게요.\n두 사람, [[○○]]은 정말 잘 맞아요.", choices: [{"t": "대화는 잘 통해요", "k": "잘 맞는 점", "v": "대화", "say": "역시, 그쪽이 맞았네요.", "vo": "hy_r04a"}, {"t": "같이 있으면 편해요", "k": "잘 맞는 점", "v": "편안함", "say": "편한 사이는 흔하지 않아요.", "vo": "hy_r04b"}, {"t": "솔직히 잘 모르겠어요", "k": "잘 맞는 점", "v": "잘 모름", "say": "모르겠다는 것도 답이에요.", "vo": "hy_r04c"}] },
      { bg: "write", vo: "hy_05_write", line: "나머지는 두 사람 이름을\n나란히 적어야 보여요.\n당신 것, 그리고 그 사람 것.", choices: [{"t": "이름 적을게요", "k": "마음가짐", "v": "적극적", "say": ""}, {"t": "그 사람한텐 비밀이죠?", "k": "마음가짐", "v": "비밀 원함", "say": "당연하죠. 우리끼리 얘기예요.", "vo": "hy_r05b"}],
        body: [["어디서 끌리고 어디서 부딪히는지", "두 사람의 오행이 서로를 채우는 곳과 깎는 곳."], ["이 인연의 흐름", "가까워지기 쉬운 시기와 조심할 시기를 흐름으로."], ["그 사람 마음을 여는 법", "상대의 기질에 맞는 말투와 다가가는 방법까지."]] }
    ],
    q: {},
    status: ["연인이에요", "썸 타는 중이에요", "짝사랑이에요", "헤어진 사이예요", "아직 아무 사이 아니에요"],
    statusSay: ["오래 같이 가려면 알아 둘 게 있어요.", "썸은 타이밍이 전부예요. 그 타이밍, 보여요.", "짝사랑이라… 그 사람 쪽 실도 한번 볼게요.", "끊어진 실도 다시 묶이는 경우가 있어요.", "아무 사이도 아닌데 여기까지 왔다면, 궁금한 거죠."]
  };
  FLOW.newyear = {
    who: "연지", qbg: "desk", layers: [["stars", "/media/n-stars.jpg"], ["letters", "/media/n-letters.jpg"], ["gaze", "/media/n-gaze.jpg"], ["desk", "/media/n-desk.jpg"]],
    bubbles: ["1분이면 충분합니다", "태어난 시간은 몰라도 됩니다", "가장 좋은 달은 언제일까요?", "열두 장의 편지가 기다립니다"],
    intro: [
      { bg: "hero", eyebrow: "연지의 2027 신년운세", vo: "ny_01_intro", line: "올해도 오셨군요.\n2027년, 당신의 해는\n이미 다 읽어 두었습니다.", choices: [{"t": "벌써요? 궁금해요", "k": "찾아온 마음", "v": "기대", "say": "그 마음으로 오신 분들이 가장 많이 가져가십니다.", "vo": "ny_r01a"}, {"t": "올해는 좀 달랐으면 해서요", "k": "찾아온 마음", "v": "변화를 바람", "say": "달라질 수 있습니다. 어디서부터인지가 중요하지요.", "vo": "ny_r01b"}, {"t": "그냥 재미로요", "k": "찾아온 마음", "v": "가벼운 호기심", "say": "재미로 오셨다가 진지해지신 분이 많았습니다.", "vo": "ny_r01c"}] },
      { bg: "stars", vo: "ny_02_stars", line: "2027년은 정미년,\n붉은 양의 해입니다.\n그 불의 기운이 당신에겐\n[[○○]]으로 들어옵니다.", choices: [{"t": "올해는 힘들었어요", "k": "2026년은", "v": "힘들었음", "say": "그렇다면 숨이 트이는 자리부터 찾아보겠습니다.", "vo": "ny_r02a"}, {"t": "그럭저럭 무난했어요", "k": "2026년은", "v": "무난했음", "say": "무난한 해 다음엔 결이 바뀌는 경우가 많습니다.", "vo": "ny_r02b"}, {"t": "좋은 해였어요", "k": "2026년은", "v": "좋았음", "say": "좋은 흐름을 이어 가는 법은 따로 있습니다.", "vo": "ny_r02c"}] },
      { bg: "letters", vo: "ny_03_letters", line: "열두 달을 열두 장의 편지로\n봉인해 두었습니다.\n그중 [[○월]]의 편지가\n유난히 무겁더군요.", choices: [{"t": "재물이 제일 궁금해요", "k": "가장 중요한 것", "v": "재물", "say": "재물이 드는 달은 따로 표시해 두었습니다.", "vo": "ny_r03a"}, {"t": "사람과 인연이요", "k": "가장 중요한 것", "v": "인연", "say": "인연이 가까워지는 달이 보입니다.", "vo": "ny_r03b"}, {"t": "일과 진로요", "k": "가장 중요한 것", "v": "일", "say": "일이 움직이는 달, 짚어 두었습니다.", "vo": "ny_r03c"}] },
      { bg: "gaze", vo: "ny_04_gaze", line: "좋은 달만\n말씀드리진 않겠습니다.\n2027년엔 쉬어 가실 달이\n[[○번]] 있습니다.", choices: [{"t": "쉬어 갈 달부터 들을게요", "k": "듣는 순서", "v": "쉬어 갈 달부터", "say": "현명하십니다. 미리 알면 비켜 갈 수 있는 것들입니다.", "vo": "ny_r04a"}, {"t": "좋은 달부터 듣고 싶어요", "k": "듣는 순서", "v": "좋은 달부터", "say": "좋습니다. 기운이 날 때 듣는 것도 방법이지요.", "vo": "ny_r04b"}] },
      { bg: "desk", vo: "ny_05_desk", line: "봉인을 여는 열쇠는 하나뿐입니다.\n당신이 태어난 날.", choices: [{"t": "생일 알려 드릴게요", "k": "마음가짐", "v": "적극적", "say": ""}, {"t": "정말 맞을까요?", "k": "마음가짐", "v": "반신반의", "say": "맞히는 것보다, 한 해를 미리 준비하시게 돕는 것이 제 일입니다.", "vo": "ny_r05b"}],
        body: [["열두 달 운세 달력", "달마다 힘을 낼 때와 쉬어 갈 때를 흐름으로 보여 드립니다."], ["재물, 인연, 일, 건강", "네 갈래의 흐름을 점수와 함께 짚어 드립니다."], ["행운의 색과 방향", "정미년에 당신을 돕는 색, 방향, 숫자까지."]] }
    ],
    q: {
      name: "그럼 시작하겠습니다.\n당신을 어떻게 불러 드릴까요?",
      gender: function (n) { return n + "님. 기억해 두겠습니다.\n성별을 알려 주십시오."; },
      birth: function (n) { return n + "님, 태어나신 날을 알려 주십시오.\n열두 장의 봉인이 여기에 묶여 있습니다."; },
      time: function (me) { return "아, " + me + " 일간이시군요. 역시.\n태어나신 시간도 아십니까?"; },
      timeOk: function (sj) { return sj + "시. 여덟 글자가 모두 섰습니다."; }, timeNo: "괜찮습니다. 여섯 글자로도 충분히 보입니다.",
      status: "2027년, 가장 바라시는 변화는 무엇입니까?",
      want: "마지막입니다.\n가장 먼저 열어 볼 편지를 고르십시오."
    },
    status: ["돈이 모이는 해", "좋은 사람을 만나는 해", "일에서 인정받는 해", "몸과 마음이 편한 해", "새로 시작하는 해"],
    statusSay: ["재물이 드는 달을 따로 적어 두었습니다.", "인연은 생각보다 가까이 있습니다.", "인정받는 달에 표시해 두었습니다.", "편안함도 준비하는 사람에게 옵니다.", "시작하기 좋은 달이 따로 있습니다."]
  };
  function FC() { return FLOW[CUR] || FLOW.love; }
  function flMeKo(pre) { var b = FL.d[(pre || "") + "birth"].split(".").map(Number), P = pillarsOf(FL.d[(pre || "") + "birth"], null, FL.d[(pre || "") + "cal"], FL.d[(pre || "") + "leap"]); return ST_KO[P.day[0]] + EL_KO[ST_EL[P.day[0]]]; }
  function qName(f, line, ph, bg) { return { q: true, bg: bg, line: line, btn: "다음",
      body: function () { return '<input class="input" id="fl-name" maxlength="12" autocomplete="off" placeholder="' + (ph || "이름 또는 닉네임") + '" aria-label="' + (ph || "이름 또는 닉네임") + '" value="' + esc(FL.d[f] || "") + '">'; },
      ok: function () { return !!FL.d[f]; },
      wire: function (upd) { var el = document.getElementById("fl-name"); el.addEventListener("input", function () { FL.d[f] = el.value.trim(); upd(); }); el.addEventListener("keydown", function (e) { if (e.key === "Enter" && FL.d[f]) flNext(); }); } }; }
  function qGender(f, line, bg) { return { q: true, bg: bg, line: line, pick: f,
      body: function () { return '<div class="choices">' + ["여성", "남성"].map(function (g) { return '<button type="button" class="choice' + (FL.d[f] === g ? " on" : "") + '" data-v="' + g + '">' + g + '</button>'; }).join("") + '</div>'; } }; }
  function qBirth(pre, line, bg) { return { q: true, bg: bg, line: line, btn: "다음",
      body: function () { var d = FL.d, Y = d[pre + "y"], M = d[pre + "m"], D = d[pre + "dd"], C = d[pre + "cal"] || "양력";
        var ys = '<option value="">년</option>'; for (var y = 2012; y >= 1930; y--) ys += '<option' + (Y == y ? " selected" : "") + '>' + y + '</option>';
        var ms = '<option value="">월</option>'; for (var m = 1; m <= 12; m++) ms += '<option value="' + m + '"' + (M == m ? " selected" : "") + '>' + m + '월</option>';
        var ds = '<option value="">일</option>'; for (var dd = 1; dd <= 31; dd++) ds += '<option value="' + dd + '"' + (D == dd ? " selected" : "") + '>' + dd + '일</option>';
        return '<div class="seg" role="group" aria-label="달력"><button type="button" data-cal="양력" aria-pressed="' + (C !== "음력") + '">양력</button><button type="button" data-cal="음력" aria-pressed="' + (C === "음력") + '">음력</button></div>' +
          '<div class="q-row3"><select class="sel" id="fl-y" aria-label="태어난 해">' + ys + '</select><select class="sel" id="fl-m" aria-label="태어난 달">' + ms + '</select><select class="sel" id="fl-d" aria-label="태어난 날">' + ds + '</select></div>' +
          '<div class="row-between"><p class="hint" id="fl-hint"></p><label class="check" id="fl-leapWrap"' + (C === "음력" ? "" : " hidden") + '><input type="checkbox" id="fl-leap"' + (d[pre + "leap"] ? " checked" : "") + '>윤달이에요</label></div>'; },
      ok: function () { return !!FL.d[pre + "birth"]; },
      wire: function (upd) { var d = FL.d, sy = document.getElementById("fl-y"), sm = document.getElementById("fl-m"), sd = document.getElementById("fl-d"), hint = document.getElementById("fl-hint");
        if (!d[pre + "cal"]) d[pre + "cal"] = "양력";
        document.querySelectorAll("#flPanel [data-cal]").forEach(function (b) { b.addEventListener("click", function () { d[pre + "cal"] = b.dataset.cal;
          document.querySelectorAll("#flPanel [data-cal]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
          document.getElementById("fl-leapWrap").hidden = d[pre + "cal"] !== "음력"; if (d[pre + "cal"] !== "음력") d[pre + "leap"] = false; }); });
        document.getElementById("fl-leap").addEventListener("change", function (e) { d[pre + "leap"] = e.target.checked; });
        function chk() { [sy, sm, sd].forEach(function (x) { x.classList.toggle("empty", !x.value); }); d[pre + "y"] = sy.value; d[pre + "m"] = sm.value; d[pre + "dd"] = sd.value; d[pre + "birth"] = null;
          if (sy.value && sm.value && sd.value) { var v = sy.value + "." + String(sm.value).padStart(2, "0") + "." + String(sd.value).padStart(2, "0"), err = validDate(v);
            hint.textContent = err || ""; hint.classList.toggle("err", !!err); if (!err) d[pre + "birth"] = v; } upd(); }
        [sy, sm, sd].forEach(function (x) { x.addEventListener("change", chk); }); chk(); } }; }
  function qTime(pre, line, bg) { return { q: true, bg: bg, line: line,
      body: function () { return '<button type="button" class="unknown" data-sj="-1">시간을 몰라요</button><div class="hours">' + SIJIN.map(function (x, i) {
        return '<button type="button" data-sj="' + i + '"><b>' + x[0] + '시</b><small>' + x[1] + '</small></button>'; }).join("") + '</div>'; },
      wire: function () { document.querySelectorAll("#flPanel [data-sj]").forEach(function (b) { b.addEventListener("click", function () {
        var sj = +b.dataset.sj; FL.d[pre + "sj"] = sj < 0 ? null : sj; FL.d[pre + "time"] = sj < 0 ? null : String((sj * 2) % 24).padStart(2, "0") + ":00"; flNext(); }); }); } }; }
  function qPick(list, line, bg) { return { q: true, bg: bg, line: line, pick: "st",
      body: function () { return '<div class="choices one">' + list().map(function (x, i) { return '<button type="button" class="choice' + (FL.d.st === i ? " on" : "") + '" data-v="' + i + '">' + x + '</button>'; }).join("") + '</div>'; } }; }
  function qWant(line, bg) { return { q: true, bg: bg, line: line,
      body: function () { return '<div class="choices one">' + PR().wants.map(function (w) { return '<button type="button" class="choice" data-w="' + w + '">' + w + '</button>'; }).join("") + '</div>'; },
      wire: function () { document.querySelectorAll("#flPanel [data-w]").forEach(function (b) { b.addEventListener("click", function () { b.classList.add("on"); setTimeout(function () { flSubmit(b.dataset.w); }, 220); }); }); } }; }
  function sjName(pre) { return SIJIN[FL.d[pre + "sj"]][0]; }
  var FL_Q = [
    qName("name", function () { return FC().q.name; }),
    qGender("gender", function () { return FC().q.gender(FL.d.name); }),
    qBirth("", function () { return FC().q.birth(FL.d.name); }),
    qTime("", function () { return FC().q.time(flMeKo()); }),
    qPick(function () { return FC().status; }, function () { var Q = FC().q; return (FL.d.time ? Q.timeOk(sjName("")) : Q.timeNo) + "\n" + Q.status; }),
    qWant(function () { return FC().statusSay[FL.d.st] + "\n" + FC().q.want; })
  ];
  var FL_QM = [
    qName("name", function () { return "좋아요. 먼저 당신부터.\n뭐라고 부르면 될까요?"; }),
    qGender("gender", function () { return FL.d.name + "님. 이름이 예쁘네요.\n성별은요?"; }),
    qBirth("", function () { return FL.d.name + "님 태어난 날을 알려 줘요.\n실의 한쪽 끝이 여기 묶여 있거든요."; }),
    qTime("", function () { return "아, " + flMeKo() + " 일간이었구나. 어쩐지.\n태어난 시간도 알아요?"; }),
    qName("pname", function () { return (FL.d.time ? sjName("") + "시, 좋아요." : "괜찮아요. 이걸로도 충분해요.") + "\n이제 그 사람 얘기를 해 볼까요?\n뭐라고 부를까요?"; }, "그 사람 이름 또는 별명", "porch"),
    qGender("pgender", function () { return FL.d.pname + "… 이름만 들어도 느낌이 와요.\n그 사람 성별은요?"; }, "porch"),
    qBirth("p", function () { return "그 사람 생일은요?\n실의 나머지 한쪽 끝이에요."; }, "porch"),
    qTime("p", function () { return flMeKo("p") + " 일간이면… 당신이랑은, 음.\n이건 결과에서 말할게요.\n그 사람 태어난 시간도 알아요?"; }, "porch"),
    qPick(function () { return FC().status; }, function () { return (FL.d.ptime ? "좋아요. 두 사람 여덟 글자가 다 섰어요." : "몰라도 괜찮아요. 충분히 보여요.") + "\n두 사람, 지금 어떤 사이예요?"; }, "porch"),
    qWant(function () { return FC().statusSay[FL.d.st] + "\n마지막이에요. 가장 알고 싶은 거 하나만."; }, "porch")
  ];
  ["hy_q01_name", "hy_q02_gender", "hy_q03_birth", "hy_q04_time", function () { return FL.d.time ? "hy_q05_pname_a" : "hy_q05_pname_b"; }, "hy_q06_pgender", "hy_q07_pbirth", "hy_q08_ptime", function () { return FL.d.ptime ? "hy_q09_status_a" : "hy_q09_status_b"; }, "hy_q10_want"].forEach(function (v, i) { FL_QM[i].vo = v; });
  ["ny_q01_name", "ny_q02_gender", "ny_q03_birth", "ny_q04_time", function () { return FL.d.time ? "ny_q05_status_a" : "ny_q05_status_b"; }, "ny_q06_want"].forEach(function (v, i) {
    FL_Q[i].vo = function () { return CUR === "newyear" ? (typeof v === "function" ? v() : v) : null; }; });
  FL_Q[5].voPre = function () { return CUR === "newyear" && FL.d.st != null ? "ny_s" + (FL.d.st + 1) : null; };
  FL_QM[9].voPre = function () { return FL.d.st != null ? "hy_s" + (FL.d.st + 1) : null; };
  function flSteps() {
    return FC().intro.map(function (S) { return { bg: S.bg, eyebrow: S.eyebrow, vo: S.vo, btn: S.btn, choices: S.choices, bubble: true, line: function () { return S.line; }, body: S.body ? function () { return promiseHTML(S.body); } : null }; }).concat(CUR === "match" ? FL_QM : FL_Q);
  }
  function flLineHTML(t, tm) {
    var h = "", k = 0, u = 0, N = 0;
    t.split(/(\[\[.*?\]\])/).forEach(function (pt) { N += /^\[\[/.test(pt) ? 3 : pt.replace(/[\s]/g, "").length; });
    var segs = tm ? tm.s : null, tot = 0; if (segs) segs.forEach(function (a) { tot += a[1] - a[0]; });
    function at(x) { var r = x * tot; for (var q = 0; q < segs.length; q++) { var L = segs[q][1] - segs[q][0]; if (r <= L || q === segs.length - 1) return segs[q][0] + Math.min(r, L); r -= L; } return 0; }
    function dl() { return segs ? Math.round(tm.off + at(u / Math.max(N, 1)) * 1000) : 150 + k * 32; }
    t.split(/(\[\[.*?\]\])/).forEach(function (pt) {
      if (/^\[\[/.test(pt)) { h += '<span class="hid">' + esc(pt.slice(2, -2)) + '</span>'; k += 2; u += 3; return; }
      pt.split("\n").forEach(function (ln, li) { if (li) h += "<br>";
        ln.split(" ").forEach(function (w, wi) { if (wi) h += " "; h += '<span style="white-space:nowrap">';
          for (var c = 0; c < w.length; c++) { h += '<span class="ch" style="animation-delay:' + dl() + 'ms">' + esc(w[c]) + '</span>'; k++; u++; }
          h += '</span>'; }); }); });
    return { html: h, ms: segs ? Math.round(tm.off + segs[segs.length - 1][1] * 1000) : 150 + k * 32 };
  }
  function flRender() {
    var STEPS = flSteps(), Q0 = FC().intro.length, S = STEPS[FL.i], flow = document.getElementById("flow"), panel = document.getElementById("flPanel"), BUB = FC().bubbles;
    flow.classList.toggle("q", !!S.q);
    var SBG = S.bg || (S.q ? FC().qbg : null); flow.querySelectorAll(".fl-layer").forEach(function (l) { l.classList.toggle("on", l.dataset.bg === SBG); });
    document.getElementById("flDots").innerHTML = STEPS.map(function (_, j) { return '<i class="' + (j === FL.i ? "on" : j < FL.i ? "done" : "") + '"></i>'; }).join("");
    voStop();
    var vMain = typeof S.vo === "function" ? S.vo() : S.vo, vPre = [FL.sayVo, S.voPre ? S.voPre() : null].filter(function (x) { return x && VOXD[x]; });
    FL.sayVo = null; if (vMain && !VOXD[vMain]) vMain = null;
    if ((vMain || vPre.length) && !voCan()) voGate();
    var useVo = vMain && voCan(), off = 0; vPre.forEach(function (x) { off += (VOXD[x].d + .25) * 1000; });
    var L = flLineHTML(S.line(), useVo ? { off: off, s: VOXD[vMain].s } : null);
    if (voCan() && (vMain || vPre.length)) voPlay(vPre.concat(vMain ? [vMain] : []), true); else if (!SBG || SBG === "hero") speak(L.ms + 120);
    var h = '<div class="fl-scene in">' + (S.eyebrow ? '<span class="fl-eyebrow">' + S.eyebrow + '</span>' : '') +
      (S.q ? '<div class="fl-who">' + dali() + '<span>' + FC().who + ' · ' + (FL.i - Q0 + 1) + ' / ' + (STEPS.length - Q0) + '</span></div>' : '') +
      (FL.say ? '<p class="fl-react">' + esc(FL.say) + '</p>' : '') +
      '<p class="fl-line">' + L.html + '</p>' +
      (S.body ? '<div class="fl-body" style="animation-delay:' + Math.min(L.ms, 900) + 'ms">' + S.body() + '</div>' : '') +
      '<div class="fl-act">' + (S.bubble ? '<div class="fl-bubble" aria-live="polite"><span id="flBub">' + BUB[0] + '</span></div>' : '') +
      (S.choices ? '<div class="fl-ch">' + S.choices.map(function (c, j) { return '<button type="button" class="fl-opt' + (j ? '' : ' first') + '" data-ci="' + j + '">' + c.t + '</button>'; }).join("") + '</div>' : '') +
      (S.btn && !S.choices ? '<button class="btn" type="button" id="flNext">' + S.btn + '</button>' : '') +
      '<div class="fl-nav"><button type="button" id="flPrev"' + (FL.i ? '' : ' hidden') + '>‹ 이전</button>' +
      (FL.i < Q0 ? '<button type="button" id="flSkip">바로 입력하기 ›</button>' : '<span></span>') + '</div></div>' +
      (FL.i === 0 ? '<p class="fl-small">' + PR().title + ' · 무료 미리보기 3장</p>' : '') + '</div>';
    panel.innerHTML = h; FL.say = null;
    if (S.choices) panel.querySelectorAll("[data-ci]").forEach(function (b) { b.addEventListener("click", function () {
      var c = S.choices[+b.dataset.ci]; FL.d.talk = FL.d.talk || {}; FL.d.talk[c.k] = c.v; b.classList.add("on");
      setTimeout(function () { FL.say = c.say || null; FL.sayVo = c.say ? c.vo || null : null; flNext(); }, 200); }); });
    var nb = document.getElementById("flNext");
    function upd() { if (nb && S.ok) nb.disabled = !S.ok(); }
    if (nb) nb.addEventListener("click", flNext);
    document.getElementById("flPrev").addEventListener("click", function () { FL.say = null; flGo(FL.i - 1); });
    var sk = document.getElementById("flSkip"); if (sk) sk.addEventListener("click", function () { FL.say = null; flGo(Q0); });
    if (S.pick) panel.querySelectorAll("[data-v]").forEach(function (b) { b.addEventListener("click", function () {
      FL.d[S.pick] = S.pick === "st" ? +b.dataset.v : b.dataset.v;
      panel.querySelectorAll("[data-v]").forEach(function (x) { x.classList.toggle("on", x === b); });
      clearTimeout(FL.nextT); FL.nextT = setTimeout(flNext, 260); }); });
    if (S.wire) S.wire(upd); upd();
    clearInterval(FL.bubT);
    if (S.bubble) { var bi = 0; FL.bubT = setInterval(function () { var el = document.getElementById("flBub"); if (!el) return; el.classList.add("swap");
      setTimeout(function () { bi = (bi + 1) % BUB.length; el.textContent = BUB[bi]; el.classList.remove("swap"); }, 350); }, 3000); }
    var inp = panel.querySelector("#fl-name"); if (inp && !FL.d.name) setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (e) {} }, 700);
  }
  function flGo(i) {
    if (i < 0 || i >= flSteps().length) return;
    var sc = document.querySelector("#flPanel .fl-scene");
    FL.i = i;
    if (sc && !reduce) { sc.classList.remove("in"); sc.classList.add("out"); setTimeout(flRender, 260); } else flRender();
  }
  function flNext() { var ST = flSteps(), S = ST[FL.i]; if (S.ok && !S.ok()) return; if (FL.i < ST.length - 1) flGo(FL.i + 1); }
  function flSubmit(want) {
    var d = FL.d; clearInterval(FL.bubT);
    state = { name: d.name, gender: d.gender, cal: d.cal, leap: !!d.leap, birth: d.birth, time: d.time || null, sj: d.sj == null ? null : d.sj, status: FC().status[d.st] || "말하기 애매해", want: want || PR().defWant, email: "", prod: CUR, talk: d.talk || {} };
    if (CUR === "match") { state.pname = d.pname; state.pgender = d.pgender; state.pcal = d.pcal || "양력"; state.pleap = !!d.pleap; state.pbirth = d.pbirth; state.ptime = d.ptime || null; state.psj = d.psj == null ? null : d.psj; }
    save(state); showLoading();
  }
  var BGM = { ctx: null, on: false, muted: false, master: null, rev: null, tm: null };
  try { BGM.muted = localStorage.getItem("hanbam-bgm") === "off"; } catch (e) {}
  function bgmBuild() {
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    var c = BGM.ctx = new AC(), m = BGM.master = c.createGain(); m.gain.value = 0; m.connect(c.destination);
    var len = Math.floor(c.sampleRate * 1.6), ir = c.createBuffer(2, len, c.sampleRate);
    for (var ch = 0; ch < 2; ch++) { var d = ir.getChannelData(ch); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
    var rv = BGM.rev = c.createConvolver(); rv.buffer = ir; var wet = c.createGain(); wet.gain.value = .28; rv.connect(wet); wet.connect(m);
    /* 아주 옅은 밝은 바탕음 (솔·레, 협화음만) */
    var pad = c.createGain(); pad.gain.value = .012; pad.connect(m); pad.connect(rv);
    [[392, 0], [587.33, 4], [783.99, -3]].forEach(function (o) { var os = c.createOscillator(); os.type = "sine"; os.frequency.value = o[0]; os.detune.value = o[1]; os.connect(pad); os.start(); });
    var lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = .1; lg.gain.value = .008; lfo.connect(lg); lg.connect(pad.gain); lfo.start();
    return true;
  }
  /* 솔 장조 5음계: 솔 라 시 레 미 */
  var BGM_SCALE = [392, 440, 493.88, 587.33, 659.25, 783.99, 880, 987.77], BGM_BASS = [196, 293.66, 246.94, 329.63];
  function bgmPluck(f, when, vol, len) {
    var c = BGM.ctx, t = when, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), g2 = c.createGain(), lp = c.createBiquadFilter();
    o.type = "triangle"; o2.type = "sine";
    o.frequency.setValueAtTime(f * 1.03, t); o.frequency.exponentialRampToValueAtTime(f, t + .05); o2.frequency.value = f * 2.01;
    if (len > .45) { var vib = c.createOscillator(), vg = c.createGain(); vib.frequency.value = 5.2; vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(f * .006, t + .35); vib.connect(vg); vg.connect(o.frequency); vib.start(t); vib.stop(t + 2); }
    lp.type = "lowpass"; lp.frequency.setValueAtTime(f * 7, t); lp.frequency.exponentialRampToValueAtTime(f * 2.2, t + .5);
    g2.gain.value = .18; o2.connect(g2); g2.connect(lp); o.connect(lp); lp.connect(g);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .004); g.gain.exponentialRampToValueAtTime(vol * .35, t + .25); g.gain.exponentialRampToValueAtTime(.0006, t + 1.9);
    g.connect(BGM.master); g.connect(BGM.rev); o.start(t); o2.start(t); o.stop(t + 2); o2.stop(t + 2);
  }
  function bgmLoop() {
    if (!BGM.on) return;
    var c = BGM.ctx, t = c.currentTime + .05, idx = 2 + Math.floor(Math.random() * 4), n = 4 + Math.floor(Math.random() * 3), beat = .34;
    bgmPluck(BGM_BASS[Math.floor(Math.random() * BGM_BASS.length)], t, .05, .8);
    if (Math.random() < .3) { for (var r = 0; r < 4; r++) bgmPluck(BGM_SCALE[Math.min(7, idx + r)], t + r * .06, .035, .3); t += .4; }
    for (var i = 0; i < n; i++) {
      var len = i === n - 1 ? .9 : (Math.random() < .3 ? beat * 2 : beat);
      bgmPluck(BGM_SCALE[idx], t, .06 + Math.random() * .02, len);
      t += len; idx = Math.max(0, Math.min(7, idx + [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)]));
    }
    BGM.tm = setTimeout(bgmLoop, (t - c.currentTime) * 1000 + 700 + Math.random() * 900);
  }
  function bgmStart() {
    if (BGM.muted || BGM.on) return;
    try { if (!BGM.ctx && !bgmBuild()) return; BGM.ctx.resume(); } catch (e) { return; }
    BGM.on = true; var t = BGM.ctx.currentTime; BGM.master.gain.cancelScheduledValues(t); BGM.master.gain.setValueAtTime(BGM.master.gain.value, t); BGM.master.gain.linearRampToValueAtTime(.7, t + 2);
    bgmLoop(); bgmBtn();
  }
  function bgmStop() {
    BGM.on = false; clearTimeout(BGM.tm); if (typeof voStop === "function") voStop(); var tg = document.querySelector(".fl-tap"); if (tg) tg.remove();
    if (BGM.ctx) { var t = BGM.ctx.currentTime; BGM.master.gain.cancelScheduledValues(t); BGM.master.gain.setValueAtTime(BGM.master.gain.value, t); BGM.master.gain.linearRampToValueAtTime(0, t + .6); }
    bgmBtn();
  }
  function bgmBtn() { var b = document.getElementById("bgmBtn"); if (!b) return; var on = BGM.on && !BGM.muted; b.classList.toggle("off", !on); b.setAttribute("aria-label", on ? "배경음 끄기" : "배경음 켜기"); b.setAttribute("aria-pressed", on); }
  document.getElementById("bgmBtn").addEventListener("click", function () {
    BGM.muted = BGM.on; try { localStorage.setItem("hanbam-bgm", BGM.muted ? "off" : "on"); } catch (e) {}
    if (BGM.muted) bgmStop(); else bgmStart();
  });
  document.getElementById("flPanel").addEventListener("pointerdown", function () { bgmStart(); });

  /* 홍연 목소리: 대사 글자를 음성 구간에 맞추고, 말하는 동안 배경음을 줄이고 입을 움직인다 */
  var VO = { el: null, an: null, buf: null, src: null, timers: [] };
  function voCan() { if (!VO) return false; var ua = navigator.userActivation; return ua ? ua.hasBeenActive : VO.unlocked; }
  function voDuck(on) { if (!BGM.ctx || !BGM.on) return; var t = BGM.ctx.currentTime, g = BGM.master.gain; g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(on ? .22 : .7, t + (on ? .25 : 1.2)); }
  function voStop() { if (!VO || !SPEAK) return; VO.timers.forEach(clearTimeout); VO.timers = []; VO.q = []; if (VO.el && !VO.el.paused) { VO.el.pause(); voDuck(false); } SPEAK.until = 0; SPEAK.live = false; }
  function voWire(el) { try { if (!BGM.ctx) bgmBuild(); if (BGM.ctx && !VO.an) { var c = BGM.ctx; VO.src = c.createMediaElementSource(el); VO.an = c.createAnalyser(); VO.an.fftSize = 512; VO.buf = new Uint8Array(VO.an.fftSize); VO.src.connect(VO.an); VO.an.connect(c.destination); } if (BGM.ctx) BGM.ctx.resume(); } catch (e) {} }
  function voOne(key, done) {
    var el = VO.el || (VO.el = new Audio()); el.preload = "auto";
    if (el.dataset.k !== key) { el.src = VOX[key]; el.dataset.k = key; }
    voWire(el); VO.priming = false; el.muted = false; try { el.currentTime = 0; } catch (e) {}
    var p = el.play(); if (p && p.catch) p.catch(function () { SPEAK.live = false; voDuck(false); if (VO.flow) voGate(); });
    voDuck(true); SPEAK.live = !!VO.an;
    if (!VO.an) (VOXD[key] ? VOXD[key].s : []).forEach(function (a) { VO.timers.push(setTimeout(function () { speak((a[1] - a[0]) * 1000); }, a[0] * 1000)); });
    el.onended = function () { SPEAK.live = false; SPEAK.until = 0; if (done) VO.timers.push(setTimeout(done, 90)); else { voDuck(false); voNextQ(); } };
  }
  function voPlay(list, flow) {
    voStop(); VO.flow = !!flow; VO.q = [];
    var g0 = document.querySelector(".fl-tap"); if (g0) g0.remove();
    (function nx(i) { if (i < list.length) voOne(list[i], i < list.length - 1 ? function () { nx(i + 1); } : null); })(0);
  }
  function voBusy() { return VO.el && !VO.el.paused && !VO.el.ended; }
  function voNextQ() { var k = VO.q && VO.q.shift(); if (k) { VO.flow = false; voOne(k, null); } }
  function voSay(key) { if (!voCan() || !VOXD[key]) return; VO.q = VO.q || []; if (voBusy() || VO.q.length) VO.q = [key]; else { VO.flow = false; voOne(key, null); } }
  function voWatch(root) {
    if (!("IntersectionObserver" in window)) return;
    if (VO.io) VO.io.disconnect();
    VO.io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !e.target.dataset.voDone) { e.target.dataset.voDone = 1; VO.io.unobserve(e.target); voSay(e.target.dataset.vo); } }); }, { threshold: .6 });
    root.querySelectorAll("[data-vo]").forEach(function (el) { VO.io.observe(el); });
  }
  function voUnlock() {
    if (VO.unlocked) return; VO.unlocked = true;
    try { if (!BGM.ctx) bgmBuild(); if (BGM.ctx) BGM.ctx.resume(); } catch (e) {}
    var el = VO.el || (VO.el = new Audio()); el.muted = true; el.src = VOX.hy_01_intro; el.dataset.k = "hy_01_intro"; VO.priming = true;
    var q = el.play(); if (q && q.then) q.then(function () { if (VO.priming) { el.pause(); el.muted = false; VO.priming = false; } }).catch(function () { el.muted = false; VO.priming = false; }); else { el.muted = false; VO.priming = false; }
  }
  document.addEventListener("pointerdown", voUnlock, true);
  document.addEventListener("keydown", voUnlock, true);
  function voGate() {
    if (document.querySelector(".fl-tap")) return;
    var g = document.createElement("button"); g.type = "button"; g.className = "fl-tap"; g.setAttribute("aria-label", "화면을 눌러 시작하기");
    g.innerHTML = '<span class="fl-tap-in"><span class="fl-tap-ring"></span><b>화면을 눌러 주세요</b><small>' + iga(FC().who) + ' 기다리고 있어요</small></span>';
    g.addEventListener("click", function () { voUnlock(); bgmStart(); g.classList.add("go"); setTimeout(function () { g.remove(); }, 450); flGo(FL.i); });
    document.body.appendChild(g);
  }
  function voLevel() { if (!VO.an || !VO.el || VO.el.paused) return -1; VO.an.getByteTimeDomainData(VO.buf); var s = 0; for (var i = 0; i < VO.buf.length; i++) { var d = (VO.buf[i] - 128) / 128; s += d * d; } return Math.min(1, Math.sqrt(s / VO.buf.length) * 5.5); }

  /* 실제 눈 감은 컷과 바꿔치기하는 깜박임 */
  (function blinkLoop() {
    var wait = 2600 + Math.random() * 2800;
    setTimeout(function () {
      var el = document.querySelector("#flow:not([hidden]) .fl-layer.on .blink-c");
      if (el && !reduce) {
        var dbl = Math.random() < .2;
        el.classList.add("shut"); setTimeout(function () { el.classList.remove("shut");
          if (dbl) setTimeout(function () { el.classList.add("shut"); setTimeout(function () { el.classList.remove("shut"); }, 120); }, 160); }, 130);
      }
      blinkLoop();
    }, wait);
  })();
  function setupFlow() {
    var v = document.getElementById("v-intro"), flow = document.getElementById("flow"), bg = flow.querySelector(".fl-bg");
    v.classList.add("flowmode"); flow.hidden = false;
    clearInterval(FL.bubT);
    if (bg.dataset.prod !== CUR) {
      bg.dataset.prod = CUR;
      bg.innerHTML = FC().layers.map(function (l) { var src = CUR === "love" ? IMG_SCENES[l[1]] : IMG[l[1]]; return '<div class="fl-layer" data-bg="' + l[0] + '"><img src="' + src + '" alt="">' + (l[2] ? '<img class="blink-c" src="' + IMG[l[2]] + '" alt="">' : '') + '</div>'; }).join("");
      FL.d.st = undefined;
    }
    window.scrollTo(0, 0);
    FL.d.talk = {}; FL.say = null;
    FL.i = 0; flRender();
  }

  /* 스크롤 대사: 섹션이 화면에 들어오면 한결이 이어서 말함 */
  var sceneObs = null;
  function setupScenes() {
    var lines = document.querySelectorAll(".scene-line");
    lines.forEach(function (el) {
      var typed = el.querySelector(".typed"), full = HERO_LINES[+el.dataset.line];
      el.querySelector(".ghost").textContent = full;
      el.classList.remove("played", "talking");
      typed.textContent = full; /* 기본은 전체 문장이 보이는 상태 */
      el.onclick = function () { el._finish && el._finish(); };
    });
    if (reduce || !("IntersectionObserver" in window)) return;
    lines.forEach(function (el) { el.querySelector(".typed").textContent = ""; });
    if (sceneObs) sceneObs.disconnect();
    sceneObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var el = en.target;
        if (!en.isIntersecting || el.classList.contains("played")) return;
        el.classList.add("played", "talking");
        el._finish = typeInto(el.querySelector(".typed"), HERO_LINES[+el.dataset.line], 38, function () { el.classList.remove("talking"); });
        sceneObs.unobserve(el);
      });
    }, { threshold: .6 });
    lines.forEach(function (el) { sceneObs.observe(el); });
  }

  /* ---------- 바람: 돌풍 세기 (0~1), 약 9초마다 한 번 불어옴 ---------- */
  function gust(t) { var x = .5 + .5 * Math.sin(t / 1000 * .7 - 1.2); return Math.pow(x, 3); }

  /* ---------- 히어로 WebGL: 머리카락·옷자락만 흔들고 고개를 아주 살짝 기울임 ---------- */
  var gl = null, glProg = null, glU = {}, glCanvas = null, glReady = false, glTex = null;
  function initGL() {
    var img = document.getElementById("heroImg");
    glCanvas = document.createElement("canvas");
    glCanvas.className = "hero-gl"; glCanvas.setAttribute("aria-hidden", "true");
    try { gl = glCanvas.getContext("webgl", { premultipliedAlpha: false, antialias: false }); } catch (e) { gl = null; }
    if (!gl) return;
    var vs = "attribute vec2 a;varying vec2 uv;void main(){uv=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}";
    var fs = [
      "precision mediump float;uniform sampler2D img,img2;uniform float t,g,mode,bl,mo,sw;varying vec2 uv;",
      "float ell(vec2 p,vec2 c,vec2 r){return 1.-smoothstep(.55,1.,length((p-c)/r));}",
      "vec2 blk(vec2 q,float cx,float hw,float y0,float y1,float b){",
      " float dx=(q.x-cx)/hw;float wx=1.-smoothstep(.55,1.,abs(dx));if(wx<=0.||b<=0.)return q;",
      " float a=y0+(y1-y0)*.35*dx*dx;float c=y1-(y1-y0)*.25*dx*dx;float h=max(c-a,.001);",
      " float s=h*.85;float d=b*h*wx*.96;float e=c+h*.25;float y=q.y;",
      " if(y>a-s&&y<a+d){y=a-s+(y-(a-s))*s/(s+d);}",
      " else if(y>=a+d&&y<e){y=a+(y-(a+d))*(e-a)/(e-(a+d));}",
      " q.y=y;return q;}",
      "void main(){",
      " vec2 p=uv;",
      " if(mode>2.5){",
      "  float mw=1.-smoothstep(.45,1.,abs(p.x-.606)/.04);float my=.231;float r=.009;float dy=p.y-my;",
      "  if(abs(dy)<r&&mw>0.){float o=mo*.5*mw;p.y=my+dy*(1.-o*(1.-abs(dy)/r));}",
      "  float tas=ell(uv,vec2(.27,.79),vec2(.035,.09));p.x+=tas*(.002+.004*g)*sin(t*2.+uv.y*18.);",
      "  gl_FragColor=texture2D(img,clamp(p,.001,.999));return;",
      " }",
      " if(mode>1.5){",
      "  p=blk(p,.470,.072,.2615,.2860,bl);",
      "  p=blk(p,.683,.058,.2560,.2790,bl);",
      "  float mw=1.-smoothstep(.45,1.,abs(p.x-.596)/.068);float my=.3745;float r=.0135;float dy=p.y-my;",
      "  if(abs(dy)<r&&mw>0.){float o=mo*.55*mw;p.y=my+dy*(1.-o*(1.-abs(dy)/r));}",
      "  float face=ell(uv,vec2(.56,.33),vec2(.26,.2));",
      "  float hair=(ell(uv,vec2(.16,.55),vec2(.18,.4))+ell(uv,vec2(.92,.5),vec2(.12,.35)))*(1.-face);",
      "  p.x+=hair*(.0016+.005*g)*sin(t*1.8+uv.y*14.);",
      "  float tas=ell(uv,vec2(.13,.38),vec2(.04,.12));p.x+=tas*(.002+.004*g)*sin(t*2.2+uv.y*20.);",
      "  vec2 pc=clamp(p,.001,.999);vec4 col=texture2D(img,pc);if(sw>0.)col=mix(col,texture2D(img2,pc),sw);",
      "  gl_FragColor=col;return;",
      " }",
      " if(mode>.5){",
      "  float face=ell(uv,vec2(.50,.235),vec2(.22,.15));",
      "  float beard=ell(uv,vec2(.53,.43),vec2(.17,.15))*(1.-face)*smoothstep(.29,.40,uv.y);",
      "  p.x+=beard*(.0016+.0045*g)*sin(t*1.5+uv.y*11.);",
      "  p.y+=beard*.0012*g*sin(t*1.9+uv.x*9.);",
      "  vec2 pv=vec2(.16,.77);float hand=ell(uv,vec2(.12,.78),vec2(.13,.07));",
      "  float fan=ell(uv,vec2(.33,.62),vec2(.38,.18))*(1.-hand);",
      "  float fa=(.010*sin(t*1.05)+.006*g*sin(t*2.3))*fan;vec2 d2=p-pv;",
      "  p=pv+vec2(d2.x*cos(fa)-d2.y*sin(fa),d2.x*sin(fa)+d2.y*cos(fa));",
      "  float str=(ell(uv,vec2(.31,.45),vec2(.035,.32))+ell(uv,vec2(.685,.5),vec2(.045,.32)))*(1.-face)*smoothstep(.2,.7,uv.y);",
      "  p.x+=str*(.0012+.003*g)*sin(t*1.7+uv.y*6.);",
      "  float robe=ell(uv,vec2(.96,.62),vec2(.12,.3));",
      "  p.x+=robe*(.001+.003*g)*sin(t*1.4-uv.y*12.);",
      "  gl_FragColor=texture2D(img,clamp(p,.001,.999));return;",
      " }",
      /* 고개: 목 위쪽만 아주 작게 회전 */
      " float hw=1.-smoothstep(.40,.58,uv.y);",
      " float ang=0.;",
      " vec2 pv=vec2(.52,.6);vec2 d=p-pv;",
      " p=mix(p,pv+vec2(d.x*cos(ang)-d.y*sin(ang),d.x*sin(ang)+d.y*cos(ang)),hw);",
      /* 머리카락: 얼굴은 보호, 바깥쪽 끝일수록 크게 */
      " float face=max(ell(uv,vec2(.52,.34),vec2(.25,.21)),ell(uv,vec2(.48,.265),vec2(.22,.05)));",
      " float hair=ell(uv,vec2(.47,.17),vec2(.42,.24))*(1.-face);",
      " float bang=ell(uv,vec2(.42,.19),vec2(.12,.05))*.4*(1.-ell(uv,vec2(.48,.265),vec2(.2,.045)));",
      " float tip=smoothstep(.0,.35,length((uv-vec2(.5,.2))*vec2(1.,1.4)));",
      " float hm=max(hair*(.35+.65*tip),bang);",
      " float w=sin(t*2.0+uv.y*16.-uv.x*7.)*.6+sin(t*3.1+uv.y*29.+uv.x*3.)*.4;",
      " p.x+=hm*(.0022+.0085*g)*w + hm*.004*g;",
      " p.y+=hm*.0012*g*sin(t*2.6+uv.x*22.);",
      /* 옷자락·고름: 손과 나침반은 보호 */
      " float hand=ell(uv,vec2(.24,.79),vec2(.27,.22));",
      " float cloth=clamp(ell(uv,vec2(.93,.80),vec2(.20,.32))+ell(uv,vec2(.05,.68),vec2(.09,.16))+ell(uv,vec2(.47,.92),vec2(.07,.10))*1.3,0.,1.)*(1.-hand);",
      " float cw=sin(t*1.6-uv.y*13.+uv.x*5.);",
      " p.x+=cloth*(.0014+.0058*g)*cw;",
      " p.y+=cloth*.0018*g*sin(t*2.1-uv.x*11.);",
      " gl_FragColor=texture2D(img,clamp(p,.001,.999));",
      "}"].join("\n");
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
    var v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) { gl = null; return; }
    glProg = gl.createProgram(); gl.attachShader(glProg, v); gl.attachShader(glProg, f); gl.linkProgram(glProg);
    if (!gl.getProgramParameter(glProg, gl.LINK_STATUS)) { gl = null; return; }
    gl.useProgram(glProg);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(glProg, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    glU.t = gl.getUniformLocation(glProg, "t"); glU.g = gl.getUniformLocation(glProg, "g"); glU.mode = gl.getUniformLocation(glProg, "mode"); glU.bl = gl.getUniformLocation(glProg, "bl"); glU.mo = gl.getUniformLocation(glProg, "mo"); glU.sw = gl.getUniformLocation(glProg, "sw");
    gl.uniform1i(gl.getUniformLocation(glProg, "img"), 0); gl.uniform1i(gl.getUniformLocation(glProg, "img2"), 1);
    function upload() {
      try {
        if (glTex) gl.deleteTexture(glTex);
        gl.activeTexture(gl.TEXTURE0);
        var tex = glTex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        if (gl.getError() !== gl.NO_ERROR) throw new Error("tex");
        img.parentNode.insertBefore(glCanvas, img.nextSibling);
        glReady = true; sizeGL(); drawGL(performance.now());
        img.style.visibility = "hidden";
      } catch (e) { gl = null; }
    }
    img.addEventListener("load", upload); if (img.complete && img.naturalWidth) upload();
  }
  function sizeGL() {
    if (!glReady) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2), r = glCanvas.getBoundingClientRect();
    glCanvas.width = Math.round(r.width * dpr); glCanvas.height = Math.round(r.height * dpr);
    gl.viewport(0, 0, glCanvas.width, glCanvas.height);
  }
  /* 눈 깜박임·입 움직임 (궁합사주 홍연) */
  var BLINK = { next: 0, start: -1, dbl: false }, SPEAK = { until: 0, from: 0 };
  function blinkAmt(t) {
    if (!BLINK.next) BLINK.next = t + 1800;
    if (BLINK.start < 0 && t >= BLINK.next) { BLINK.start = t; BLINK.dbl = Math.random() < .2; }
    if (BLINK.start < 0) return 0;
    var k = t - BLINK.start, D = 170;
    if (k > D) { if (BLINK.dbl) { BLINK.dbl = false; BLINK.start = t + 90; return 0; } BLINK.start = -1; BLINK.next = t + 2400 + Math.random() * 3200; return 0; }
    if (k < 0) return 0;
    return k < 130 ? 1 : 0;
  }
  var MO_S = 0;
  function mouthAmt(t) {
    if (SPEAK.live) { var lv = voLevel(); if (lv >= 0) { MO_S += ((lv > .08 ? lv : 0) - MO_S) * .35; return MO_S; } }
    if (t > SPEAK.until) return 0;
    var k = (t - SPEAK.from) / 1000, env = Math.min(1, (SPEAK.until - t) / 180) * Math.min(1, k * 6);
    var v = .5 + .5 * Math.sin(k * 21) * Math.sin(k * 7.7 + 1.3);
    return Math.max(0, v) * env;
  }
  var glTex2 = null, glTex2Ready = false;
  function tex2() {
    if (glTex2Ready) return true;
    if (glTex2 || !gl) return false;
    glTex2 = new Image();
    glTex2.onload = function () {
      try {
        var t = gl.createTexture(); gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, glTex2);
        gl.activeTexture(gl.TEXTURE0); glTex2Ready = true;
      } catch (e) {}
    };
    glTex2.src = IMG["/media/m-hero-c.jpg"];
    return false;
  }
  function speak(ms) { var n = performance.now(); SPEAK.from = n; SPEAK.until = n + ms; }
  function drawGL(t) {
    if (!glReady) return;
    gl.uniform1f(glU.mode, PR().mode); gl.uniform1f(glU.bl, 0); gl.uniform1f(glU.sw, PR().mode === 2 && tex2() && !reduce ? blinkAmt(t) : 0); gl.uniform1f(glU.mo, reduce ? 0 : mouthAmt(t)); gl.uniform1f(glU.t, reduce ? 0 : t / 1000); gl.uniform1f(glU.g, reduce ? 0 : gust(t));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /* ---------- 금가루·꽃잎·바람결 캔버스 ---------- */
  var sky = document.getElementById("sky"), ctx = sky.getContext("2d"), stars = [], petals = [], streaks = [], skyRAF = 0, lastT = 0;
  function sizeSky() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w = sky.clientWidth, h = sky.clientHeight;
    sky.width = w * dpr; sky.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = []; petals = []; streaks = [];
    var n = Math.round(w * h / 4200);
    for (var i = 0; i < n; i++) stars.push(mk(w, h, true));
    for (var j = 0; j < PR().petals; j++) petals.push(mkPetal(w, h, true));
    sizeGL();
  }
  function mk(w, h, any) {
    var big = Math.random() < .15;
    return { x: Math.random() * w, y: any ? Math.random() * h : h + 10, r: big ? 1.6 + Math.random() * 1.6 : .5 + Math.random() * 1, vy: .08 + Math.random() * .22, sway: Math.random() * 6.28, p: Math.random() * 6.28, s: .5 + Math.random() * 1.4, z: .4 + Math.random() * .9 };
  }
  function mkPetal(w, h, any) {
    return { x: any ? Math.random() * w : -20 - Math.random() * 80, y: Math.random() * h * .8, sz: 3 + Math.random() * 3, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .06, fl: Math.random() * 6.28, z: .6 + Math.random() * .8 };
  }
  function drawSky(t) {
    var w = sky.clientWidth, h = sky.clientHeight, dt = Math.min(48, t - (lastT || t)) / 16.7, G = reduce ? 0 : gust(t), wind = .12 + 2.2 * G;
    lastT = t;
    ctx.clearRect(0, 0, w, h);
    /* 바람결: 돌풍이 셀 때만 가는 빛줄기가 옆으로 스침 */
    if (!reduce && G > .25 && Math.random() < .12 * G * dt) streaks.push({ x: -140, y: 30 + Math.random() * h * .75, len: 60 + Math.random() * 120, v: 7 + Math.random() * 6, a: .1 + .18 * G, curve: (Math.random() - .5) * 18 });
    for (var k = streaks.length - 1; k >= 0; k--) {
      var st = streaks[k]; st.x += st.v * dt;
      if (st.x - st.len > w) { streaks.splice(k, 1); continue; }
      var gr = ctx.createLinearGradient(st.x - st.len, 0, st.x, 0);
      gr.addColorStop(0, "rgba(255,236,200,0)"); gr.addColorStop(.7, "rgba(255,236,200," + st.a + ")"); gr.addColorStop(1, "rgba(255,236,200,0)");
      ctx.strokeStyle = gr; ctx.lineWidth = 1; ctx.beginPath();
      ctx.moveTo(st.x - st.len, st.y); ctx.quadraticCurveTo(st.x - st.len / 2, st.y + st.curve, st.x, st.y); ctx.stroke();
    }
    /* 금가루: 위로 떠오르다 바람에 옆으로 쓸림 */
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (!reduce) {
        s.y -= s.vy * dt; s.x += (Math.sin(t / 1800 + s.sway) * .12 + wind * s.z * .9) * dt;
        if (s.y < -10 || s.x > w + 12) { stars[i] = s = mk(w, h, false); if (Math.random() < .5) { s.x = -8; s.y = Math.random() * h; } }
      }
      var a = reduce ? .6 : .25 + .75 * (.5 + .5 * Math.sin(s.p + t / 1000 * s.s));
      var fade = Math.min(1, s.y / (h * .25));
      var g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.2);
      g.addColorStop(0, "rgba(255,226,160," + (a * fade) + ")"); g.addColorStop(.35, "rgba(240,190,100," + (a * fade * .45) + ")"); g.addColorStop(1, "rgba(240,190,100,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3.2, 0, 6.283); ctx.fill();
    }
    /* 꽃잎: 몇 장만, 돌풍에 빨라지고 뒤집힘 */
    for (var j = 0; j < petals.length; j++) {
      var pt = petals[j];
      if (!reduce) {
        pt.x += (.35 + 3.2 * G) * pt.z * dt; pt.y += (Math.sin(t / 900 + pt.fl) * .35 + .18 - G * .25) * dt;
        pt.rot += (pt.vr + G * .05) * dt;
        if (pt.x > w + 30 || pt.y > h + 20 || pt.y < -30) petals[j] = mkPetal(w, h, false);
      }
      var flip = Math.abs(Math.cos(t / 700 + pt.fl));
      ctx.save(); ctx.translate(pt.x, pt.y); ctx.rotate(pt.rot); ctx.scale(1, .35 + .65 * flip);
      ctx.globalAlpha = .55 + .3 * pt.z / 1.4;
      var pg = ctx.createLinearGradient(-pt.sz, 0, pt.sz, 0);
      pg.addColorStop(0, "#fbe3d2"); pg.addColorStop(1, "#e9b9a6");
      ctx.fillStyle = pg; ctx.beginPath();
      ctx.moveTo(-pt.sz, 0); ctx.quadraticCurveTo(0, -pt.sz * .9, pt.sz, 0); ctx.quadraticCurveTo(0, pt.sz * .9, -pt.sz, 0); ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    drawGL(t);
    if (!reduce) skyRAF = requestAnimationFrame(drawSky);
  }
  function startSky() { cancelAnimationFrame(skyRAF); if (!gl && !glProg) initGL(); sizeSky(); lastT = 0; skyRAF = requestAnimationFrame(drawSky); }
  window.addEventListener("resize", function () { if (!document.getElementById("v-intro").hidden) startSky(); });

  /* ---------- 만세력 (샘플용 간이 계산) ---------- */
  var ST = "甲乙丙丁戊己庚辛壬癸", ST_KO = "갑을병정무기경신임계";
  var BR = "子丑寅卯辰巳午未申酉戌亥", BR_KO = "자축인묘진사오미신유술해";
  var ST_EL = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4], BR_EL = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];
  var EL_HZ = "木火土金水", EL_KO = ["목", "화", "토", "금", "수"], EL_NM = ["나무", "불", "흙", "쇠", "물"];
  var EL_VAR = ["--el-wood", "--el-fire", "--el-earth", "--el-metal", "--el-water"];
  /* 실제 계산은 src/lib/saju/engine.ts (window.HanbamSaju) 에서 합니다.
     절입 시각(분 단위), 한국 표준시 이력·서머타임, 서울 태양시 보정, KASI 음력 변환을 반영해요. */
  function mod(n, m) { return ((n % m) + m) % m; }
  function sajuOf(birth, time, cal, leap, sj, gender) {
    var b = String(birth).split(".").map(Number), t = time ? String(time).split(":").map(Number) : null;
    var inp = { year: b[0], month: b[1], day: b[2], calendar: cal === "음력" ? "lunar" : "solar", isLeapMonth: !!leap };
    if (sj != null && sj >= 0) inp.sijin = sj; else if (t) { inp.hour = t[0]; inp.minute = t[1] || 0; }
    if (gender) inp.gender = gender === "남성" ? "male" : "female";
    return window.HanbamSaju.calculateSaju(inp);
  }
  function pillarsOf(birth, time, cal, leap, sj) {
    var r = sajuOf(birth, time, cal, leap, sj), P = r.legacy; P.info = r; return P;
  }
  // 양력 날짜(+시)만으로 계산. 오늘의 운세, 2027 월별 흐름에 씁니다.
  function calcPillars(y, m, d, hh) {
    var inp = { year: y, month: m, day: d };
    if (hh != null) { inp.hour = hh; inp.minute = 0; }
    var r = window.HanbamSaju.calculateSaju(inp), P = r.legacy; P.info = r; return P;
  }
  function calcNote(P, cal) {
    var r = P && P.info; if (!r) return "";
    var parts = ["절입 시각 기준 만세력으로 세웠어요"];
    if (cal === "음력") parts.push("양력 " + r.solarDate.year + "." + r.solarDate.month + "." + r.solarDate.day + "로 바꿔 계산");
    if (r.timeKnown && r.correction.solarShiftMinutes) parts.push("서울 태양시 보정" + (r.correction.daylightSaving ? "·서머타임" : "") + " 반영");
    var note = parts.join(" · ") + ".";
    if (r.boundaryWarning) note += " 태어난 날 절기가 바뀌어서, 태어난 시간을 알면 년주·월주가 달라질 수 있어요.";
    return note;
  }

  var DAY = [
    { img: "곧게 자라는 큰 나무", kw: ["곧은 진심", "먼저 내미는 손", "느린 확신"], t: "갑목은 하늘을 향해 곧게 자라는 큰 나무예요. 좋아하는 마음이 생기면 숨기기보다 먼저 표현하고, 상대에게도 같은 진심을 바라죠. 대신 확신이 들 때까지는 생각보다 오래 지켜보는 쪽입니다." },
    { img: "바람 따라 뻗는 덩굴꽃", kw: ["섬세한 공감", "관계를 키우는 힘", "조용한 끈기"], t: "을목은 바람을 타고 부드럽게 뻗어 가는 덩굴꽃이에요. 상대의 작은 변화도 잘 알아채고, 관계를 천천히 키워 가는 데 강하죠. 다만 맞춰 주다 보면 정작 당신 마음을 말할 때를 놓치기 쉽습니다." },
    { img: "모두를 비추는 한낮의 해", kw: ["밝은 온기", "솔직한 표현", "빠른 시작"], t: "병화는 한낮의 해처럼 주변을 환하게 만드는 기운이에요. 호감이 생기면 표정과 행동에 바로 드러나고, 시작이 빠르죠. 그만큼 상대의 반응이 미지근하면 금방 지치기도 합니다." },
    { img: "밤을 밝히는 촛불", kw: ["깊은 집중", "다정한 배려", "은근한 매력"], t: "정화는 어두운 방을 밝히는 촛불 같은 기운이에요. 여러 사람보다 한 사람에게 깊이 집중하고, 작은 배려로 마음을 전하죠. 겉으로는 담담해 보여도 속으로는 오래 마음을 태우는 쪽입니다." },
    { img: "흔들림 없는 큰 산", kw: ["든든한 안정감", "깊은 책임감", "신중한 시작"], t: "무토는 계절이 바뀌어도 그 자리에 있는 큰 산이에요. 쉽게 흔들리지 않는 안정감이 매력이고, 한번 마음을 주면 끝까지 책임지려 하죠. 그래서 시작 앞에서는 누구보다 신중합니다." },
    { img: "씨앗을 품는 너른 밭", kw: ["포근한 수용", "현실 감각", "돌보는 사랑"], t: "기토는 씨앗을 품고 길러 내는 너른 밭이에요. 상대를 있는 그대로 받아 주고 챙기는 데 익숙하죠. 다만 돌보는 쪽에만 서다 보면 당신도 기대고 싶다는 말을 아끼게 됩니다." },
    { img: "아직 다듬지 않은 원석", kw: ["분명한 기준", "깊은 의리", "시원한 결단"], t: "경금은 단단한 원석 같은 기운이에요. 좋고 싫음이 분명하고, 내 사람이라고 정하면 의리로 지키죠. 애매한 관계를 오래 끌기보다 매듭짓고 싶어 합니다." },
    { img: "빛을 머금은 보석", kw: ["섬세한 안목", "단단한 자존감", "정제된 표현"], t: "신금은 잘 다듬어진 보석이에요. 사람을 보는 눈이 섬세하고, 당신을 소중히 대하는 사람에게 마음이 움직이죠. 상처받으면 티를 덜 내는 대신 거리를 조용히 벌립니다." },
    { img: "깊고 넓은 바다", kw: ["넓은 포용", "자유로운 마음", "깊은 속내"], t: "임수는 깊고 넓은 바다 같은 기운이에요. 웬만한 일은 넉넉하게 품어 주고, 서로의 자유를 지켜 주는 관계를 편하게 느끼죠. 속마음은 생각보다 깊어서 쉽게 꺼내지 않습니다." },
    { img: "땅을 적시는 이슬비", kw: ["조용한 공감", "예민한 직감", "스며드는 사랑"], t: "계수는 땅을 조용히 적시는 이슬비예요. 말하지 않아도 분위기를 먼저 읽고, 천천히 스며드는 방식으로 사랑하죠. 직감이 좋은 만큼 혼자 앞서 걱정하는 밤도 있습니다." }
  ];
  var WEAK_TIP = ["새로운 시작과 성장", "표현과 열정", "안정과 균형", "결단과 정리", "휴식과 유연함"];

  /* ---------- 상태 ---------- */
  var SAMPLE = { name: "하늘", gender: "여성", cal: "양력", leap: false, birth: "1997.05.21", time: "14:30", status: "지금은 솔로", want: "인연은 언제쯤 올까", email: "" };
  var state = {};
  function loadSaved() { try { var s = sessionStorage.getItem("byeolsum-answers"); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
  function save(s) { try { sessionStorage.setItem("byeolsum-answers", JSON.stringify(s)); } catch (e) {} }

  /* ---------- 채팅형 입력 ---------- */
  var STATUS = ["지금은 솔로", "썸 타는 중", "연애 중", "이별 후 정리 중", "말하기 애매해"];
  var STATUS_REACT = {
    "지금은 솔로": "혼자인 시간도 흐름의 일부예요. 다음 인연이 어떤 결인지 보죠.",
    "썸 타는 중": "설레는 때군요. 두 사람의 기운이 어디서 만나는지도 짚어 보겠습니다.",
    "연애 중": "좋네요. 지금 관계를 더 편안하게 만드는 길도 함께 보죠.",
    "이별 후 정리 중": "많이 지쳤겠어요. 서두르지 말고, 당신 마음부터 살펴봅시다.",
    "말하기 애매해": "괜찮아요. 애매한 것도 분명한 하나의 상태니까."
  };
  var WANTS = ["인연은 언제쯤 올까", "나랑 잘 맞는 사람은", "지금 관계의 앞날", "내 연애 패턴과 습관"];
  var HOUR_NM = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
  var STEPS = [
    { key: "name", bot: function () { return ["반갑습니다. 오늘 당신의 길을 읽을 한결이에요.", "시작하기 전에 몇 가지만 묻죠. 먼저, 당신을 어떻게 부르면 될까요?"]; } },
    { key: "gender", bot: function (s) { return [s.name + "님. 좋은 이름이네요.", "성별을 알려 주세요. 대운이 흐르는 방향을 정할 때 씁니다."]; } },
    { key: "birth", bot: function () { return ["고마워요. 이제 태어난 날을 알려 주세요.", "양력인지 음력인지도 함께 골라 주고요."]; } },
    { key: "time", bot: function (s) { return [s.birth.slice(0, 4) + "년 " + Number(s.birth.slice(5, 7)) + "월생이군요.", "태어난 시간을 알면 더 깊이 볼 수 있어요. 몰라도 괜찮습니다."]; } },
    { key: "status", bot: function (s) {
        var first = s.time ? HOUR_NM[Math.floor(((Number(s.time.slice(0, 2)) + 1) % 24) / 2)] + "시에 태어났군요. 여덟 글자를 모두 세우겠습니다." : "괜찮아요. 시간 없이도 여섯 글자면 충분히 읽힙니다.";
        return [first, "지금 연애는 어떤 상태인가요?"]; } },
    { key: "want", bot: function (s) { return [STATUS_REACT[s.status], "이번 풀이에서 가장 궁금한 걸 하나 골라 주세요. 마지막 장에서 그 질문에만 따로 답하겠습니다."]; } },
    { key: "email", bot: function () { return ["알겠어요. 그 부분은 각별히 보죠.", "마지막으로, 풀이가 완성되면 어디로 보내 드릴까요?"]; } },
    { key: "confirm", bot: function () { return ["정리하면 이렇습니다. 맞는지 한번 봐 주세요."]; } }
  ];
  var TOTAL_Q = 7;
  var chat = document.getElementById("chat"), composer = document.getElementById("composer");
  var stepIdx = 0, timers = [], formDali = null;
  document.getElementById("chatGuide").innerHTML = dali("form-dali") + '<div><b>한결</b><span>연애운 담당 · 질문 7개, 1분이면 끝나요</span></div>';
  formDali = document.querySelector(".form-dali");

  function answerText(key, s) {
    switch (key) {
      case "name": return s.name;
      case "gender": return s.gender;
      case "birth": return s.cal + (s.leap ? "(윤달)" : "") + " " + s.birth;
      case "time": return s.time ? s.time : "시간을 몰라요";
      case "email": return s.email || "샘플이라 건너뛸게요";
      default: return s[key];
    }
  }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function addMsg(cls, text) { var el = document.createElement("div"); el.className = "msg " + cls; el.textContent = text; chat.appendChild(el); return el; }
  function scrollEnd() { window.scrollTo({ top: document.body.scrollHeight, behavior: reduce ? "auto" : "smooth" }); }
  function setProgress() {
    var n = Math.min(stepIdx + 1, TOTAL_Q);
    document.getElementById("progFill").style.width = (stepIdx >= TOTAL_Q ? 100 : (stepIdx / TOTAL_Q) * 100 + 4) + "%";
    document.getElementById("stepCount").textContent = stepIdx >= TOTAL_Q ? "확인" : n + " / " + TOTAL_Q;
  }

  function startForm(fresh) {
    clearTimers();
    if (fresh) state = {};
    stepIdx = 0; chat.innerHTML = ""; composer.innerHTML = "";
    askStep(false);
  }
  function rebuildTo(idx) {
    clearTimers(); chat.innerHTML = "";
    for (var i = 0; i < idx; i++) {
      STEPS[i].bot(state).forEach(function (t) { var m = addMsg("bot", t); m.style.animation = "none"; });
      var m2 = addMsg("me", answerText(STEPS[i].key, state)); m2.style.animation = "none";
    }
    stepIdx = idx; askStep(true);
  }
  function askStep(quick) {
    setProgress(); composer.innerHTML = "";
    var lines = STEPS[stepIdx].bot(state), delay = 0;
    if (quick || reduce) {
      lines.forEach(function (t) { addMsg("bot", t); });
      renderComposer(); scrollEnd(); return;
    }
    lines.forEach(function (t, i) {
      timers.push(setTimeout(function () {
        var typing = addMsg("bot typing", ""); typing.innerHTML = "<i></i><i></i><i></i>";
        formDali.classList.add("is-talking"); scrollEnd();
        timers.push(setTimeout(function () {
          typing.remove(); addMsg("bot", t); scrollEnd();
          formDali.classList.remove("is-talking");
          if (i === lines.length - 1) { renderComposer(); scrollEnd(); }
        }, 520 + Math.min(t.length * 12, 520)));
      }, delay));
      delay += 620 + Math.min(t.length * 12, 520) + 140;
    });
  }
  function commit(key, value) {
    if (key) state[key] = value;
    addMsg("me", answerText(key, state));
    composer.innerHTML = "";
    stepIdx++; askStep(false);
  }

  function renderComposer() {
    var key = STEPS[stepIdx].key, h = '<div class="composer-inner">';
    if (key === "name") {
      h += '<form class="field" id="f"><input class="input" id="in-name" maxlength="12" autocomplete="nickname" placeholder="이름 또는 닉네임" aria-label="이름"><button class="send" id="sendBtn" disabled aria-label="보내기">' + SEND_SVG + '</button></form><p class="hint">풀이에서 이 이름으로 불러 줄게요.</p>';
    } else if (key === "gender") {
      h += '<div class="choices"><button class="choice" data-v="여성">여성</button><button class="choice" data-v="남성">남성</button></div>';
    } else if (key === "birth") {
      h += '<div class="seg" role="group" aria-label="달력"><button type="button" data-cal="양력" aria-pressed="' + (state.cal !== "음력") + '">양력</button><button type="button" data-cal="음력" aria-pressed="' + (state.cal === "음력") + '">음력</button></div>' +
        '<form class="field" id="f"><input class="input" id="in-birth" inputmode="numeric" maxlength="10" placeholder="1997.05.21" aria-label="생년월일" value="' + (state.birth || "") + '"><button class="send" id="sendBtn" disabled aria-label="보내기">' + SEND_SVG + '</button></form>' +
        '<div class="row-between"><p class="hint" id="hint">숫자 8자리만 입력하면 돼요.</p><label class="check" id="leapWrap" ' + (state.cal === "음력" ? "" : "hidden") + '><input type="checkbox" id="in-leap"' + (state.leap ? " checked" : "") + '>윤달</label></div>';
    } else if (key === "time") {
      h += '<form class="field" id="f"><input class="input" id="in-time" inputmode="numeric" maxlength="5" placeholder="14:30" aria-label="태어난 시간"><button class="send" id="sendBtn" disabled aria-label="보내기">' + SEND_SVG + '</button></form>' +
        '<button class="unknown" type="button" id="noTime"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>시간모름</button><p class="hint" id="hint">24시간 기준으로 적어 주세요. 오후 2시 반은 14:30</p>';
    } else if (key === "status") {
      h += '<div class="choices">' + STATUS.map(function (s, i) { return '<button class="choice' + (i === 4 ? " wide" : "") + '" data-v="' + s + '">' + s + '</button>'; }).join("") + '</div>';
    } else if (key === "want") {
      h += '<div class="choices one">' + WANTS.map(function (s) { return '<button class="choice" data-v="' + s + '">' + s + '</button>'; }).join("") + '</div>';
    } else if (key === "email") {
      h += '<form class="field" id="f"><input class="input" id="in-email" type="email" inputmode="email" autocomplete="email" placeholder="name@example.com" aria-label="이메일"><button class="send" id="sendBtn" disabled aria-label="보내기">' + SEND_SVG + '</button></form>' +
        '<p class="hint" id="hint">샘플 화면이라 실제로 메일을 보내지 않아요.</p><button class="skip" type="button" id="skipMail">이메일 없이 결과 보기</button>';
    } else if (key === "confirm") {
      var rows = [["이름", state.name], ["성별", state.gender], ["생년월일", state.cal + (state.leap ? "(윤달) " : " ") + state.birth], ["태어난 시간", state.time || "모름"], ["연애 상태", state.status], ["궁금한 것", state.want]];
      chat.insertAdjacentHTML("beforeend", '<dl class="summary">' + rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join("") + '</dl>');
      h += '<button class="btn" type="button" id="goResult">이대로 풀이 보기</button><button class="skip" type="button" id="restart">처음부터 다시 입력</button>';
    }
    composer.innerHTML = h + '</div>';
    wire(key);
  }
  var SEND_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function validDate(v) {
    var m = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(v); if (!m) return "형식을 1997.05.21처럼 맞춰 주세요.";
    var y = +m[1], mo = +m[2], d = +m[3];
    if (y < 1930 || y > 2012) return "1930년부터 2012년생까지 볼 수 있어요.";
    var dt = new Date(Date.UTC(y, mo - 1, d));
    if (dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return "없는 날짜예요. 한 번 더 확인해 주세요.";
    return "";
  }
  function wire(key) {
    composer.querySelectorAll(".choice").forEach(function (b) { b.addEventListener("click", function () { commit(key, b.dataset.v); }); });
    var f = document.getElementById("f"), send = document.getElementById("sendBtn"), hint = document.getElementById("hint");
    if (key === "name") {
      var inN = document.getElementById("in-name");
      inN.addEventListener("input", function () { send.disabled = !inN.value.trim(); });
      f.addEventListener("submit", function (e) { e.preventDefault(); if (inN.value.trim()) commit("name", inN.value.trim()); });
      focusSoon(inN);
    }
    if (key === "birth") {
      var inB = document.getElementById("in-birth");
      state.cal = state.cal || "양력";
      composer.querySelectorAll("[data-cal]").forEach(function (b) {
        b.addEventListener("click", function () {
          state.cal = b.dataset.cal;
          composer.querySelectorAll("[data-cal]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
          document.getElementById("leapWrap").hidden = state.cal !== "음력";
        });
      });
      var check = function () { var err = inB.value.length === 10 ? validDate(inB.value) : ""; send.disabled = inB.value.length !== 10 || !!err; hint.textContent = err || "숫자 8자리만 입력하면 돼요."; hint.classList.toggle("err", !!err); };
      inB.addEventListener("input", function () {
        var d = inB.value.replace(/\D/g, "").slice(0, 8);
        inB.value = d.length > 6 ? d.slice(0, 4) + "." + d.slice(4, 6) + "." + d.slice(6) : d.length > 4 ? d.slice(0, 4) + "." + d.slice(4) : d;
        check();
      });
      check();
      f.addEventListener("submit", function (e) { e.preventDefault(); if (!send.disabled) { state.leap = state.cal === "음력" && document.getElementById("in-leap").checked; commit("birth", inB.value); } });
      focusSoon(inB);
    }
    if (key === "time") {
      var inT = document.getElementById("in-time");
      inT.addEventListener("input", function () {
        var d = inT.value.replace(/\D/g, "").slice(0, 4);
        inT.value = d.length > 2 ? d.slice(0, 2) + ":" + d.slice(2) : d;
        var ok = /^([01]\d|2[0-3]):[0-5]\d$/.test(inT.value);
        send.disabled = !ok;
        var bad = inT.value.length === 5 && !ok;
        hint.textContent = bad ? "00:00부터 23:59 사이로 적어 주세요." : "24시간 기준으로 적어 주세요. 오후 2시 반은 14:30";
        hint.classList.toggle("err", bad);
      });
      f.addEventListener("submit", function (e) { e.preventDefault(); if (!send.disabled) commit("time", inT.value); });
      document.getElementById("noTime").addEventListener("click", function () { commit("time", null); });
      focusSoon(inT);
    }
    if (key === "email") {
      var inE = document.getElementById("in-email");
      inE.addEventListener("input", function () { send.disabled = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inE.value.trim()); });
      f.addEventListener("submit", function (e) { e.preventDefault(); if (!send.disabled) commit("email", inE.value.trim()); });
      document.getElementById("skipMail").addEventListener("click", function () { commit("email", ""); });
    }
    if (key === "confirm") {
      document.getElementById("goResult").addEventListener("click", function () { save(state); showLoading(); });
      document.getElementById("restart").addEventListener("click", function () { startForm(true); });
    }
  }
  function focusSoon(el) { if (window.matchMedia("(hover: hover)").matches) setTimeout(function () { el.focus({ preventScroll: true }); }, 60); }
  document.getElementById("backBtn").addEventListener("click", function () {
    if (stepIdx === 0) { go("love"); return; }
    rebuildTo(stepIdx - 1);
  });

  /* ---------- 페이지 안 바로 시작 폼 ---------- */
  var SIJIN = [["자", "23:30~01:30"], ["축", "01:30~03:30"], ["인", "03:30~05:30"], ["묘", "05:30~07:30"], ["진", "07:30~09:30"], ["사", "09:30~11:30"], ["오", "11:30~13:30"], ["미", "13:30~15:30"], ["신", "15:30~17:30"], ["유", "17:30~19:30"], ["술", "19:30~21:30"], ["해", "21:30~23:30"]]; // 서울 태양시 보정을 반영한 한국 표준시
  var q = { step: 0, d: { cal: "양력" } }, qSayFinish = null;
  var qSay = document.getElementById("qSay"), qBody = document.getElementById("qBody"), qDone = document.getElementById("qDone");
  function qLine(t) { qSayFinish && qSayFinish(); qSayFinish = typeInto(qSay, t, 26); }
  function qChips() {
    var d = q.d, c = [];
    if (q.step > 0) c.push([0, d.name + " · " + d.gender]);
    if (q.step > 1) c.push([1, d.cal + (d.leap ? "(윤달)" : "") + " " + d.birth]);
    if (q.step > 2) c.push([2, d.time ? SIJIN[d.sj][0] + "시 " + SIJIN[d.sj][1] : "시간 모름"]);
    qDone.innerHTML = c.map(function (x) { return '<button type="button" data-edit="' + x[0] + '" aria-label="' + esc(x[1]) + ' 수정">' + esc(x[1]) + ' ✎</button>'; }).join("");
    qDone.querySelectorAll("[data-edit]").forEach(function (b) { b.addEventListener("click", function () { qGo(+b.dataset.edit); }); });
  }
  function qGo(n) {
    q.step = n;
    document.getElementById("qStepTxt").textContent = (n + 1) + " / 4";
    document.getElementById("qProg").style.width = ((n + 1) * 25) + "%";
    qChips();
    var d = q.d, h = "";
    if (n === 0) {
      qLine(PR().q[0]);
      h = '<input class="input" id="q-name" maxlength="12" autocomplete="nickname" placeholder="이름 또는 닉네임" aria-label="이름 또는 닉네임" value="' + esc(d.name || "") + '">' +
        '<div class="choices"><button type="button" class="choice' + (d.gender === "여성" ? " on" : "") + '" data-g="여성">여성</button><button type="button" class="choice' + (d.gender === "남성" ? " on" : "") + '" data-g="남성">남성</button></div>' +
        '<p class="hint" id="q-hint">이름을 적고 성별을 누르면 바로 다음으로 넘어가요.</p>';
    } else if (n === 1) {
      qLine(PR().q[1](d.name));
      var ys = '<option value="">년</option>'; for (var y = 2012; y >= 1930; y--) ys += '<option' + (d.y == y ? " selected" : "") + '>' + y + '</option>';
      var ms = '<option value="">월</option>'; for (var m = 1; m <= 12; m++) ms += '<option value="' + m + '"' + (d.m == m ? " selected" : "") + '>' + m + '월</option>';
      var ds = '<option value="">일</option>'; for (var dd = 1; dd <= 31; dd++) ds += '<option value="' + dd + '"' + (d.dd == dd ? " selected" : "") + '>' + dd + '일</option>';
      h = '<div class="seg" role="group" aria-label="달력"><button type="button" data-cal="양력" aria-pressed="' + (d.cal !== "음력") + '">양력</button><button type="button" data-cal="음력" aria-pressed="' + (d.cal === "음력") + '">음력</button></div>' +
        '<div class="q-row3"><select class="sel" id="q-y" aria-label="태어난 해">' + ys + '</select><select class="sel" id="q-m" aria-label="태어난 달">' + ms + '</select><select class="sel" id="q-d" aria-label="태어난 날">' + ds + '</select></div>' +
        '<div class="row-between"><p class="hint" id="q-hint">세 칸을 고르면 다음으로 넘어가요.</p><label class="check" id="q-leapWrap"' + (d.cal === "음력" ? "" : " hidden") + '><input type="checkbox" id="q-leap"' + (d.leap ? " checked" : "") + '>윤달이에요</label></div>';
    } else if (n === 2) {
      qLine(PR().q[2]);
      h = '<button type="button" class="unknown" id="q-notime">시간을 몰라요</button><div class="hours">' + SIJIN.map(function (x, i) {
        return '<button type="button" data-sj="' + i + '"><b>' + x[0] + '시</b><small>' + x[1] + '</small></button>'; }).join("") + '</div>';
    } else {
      qLine(PR().q[3]);
      h = '<div class="chips">' + PR().wants.map(function (w) { return '<button type="button" data-w="' + w + '">' + w + '</button>'; }).join("") + '</div>' +
        '<form class="field" id="q-wf"><input class="input" id="q-want" maxlength="40" placeholder="직접 적어도 돼요 (선택)" aria-label="궁금한 점 한 줄"><button class="send" aria-label="풀이 보기">' + SEND_SVG + '</button></form>' +
        '<button type="button" class="skip" id="q-skip">건너뛰고 바로 풀이 보기</button>';
    }
    qBody.innerHTML = h;
    qBody.style.animation = "none"; void qBody.offsetWidth; qBody.style.animation = "";
    qWire(n);
  }
  function qWire(n) {
    var d = q.d, hint = document.getElementById("q-hint");
    if (n === 0) {
      var inN = document.getElementById("q-name");
      qBody.querySelectorAll("[data-g]").forEach(function (b) { b.addEventListener("click", function () {
        d.gender = b.dataset.g; qBody.querySelectorAll("[data-g]").forEach(function (x) { x.classList.toggle("on", x === b); });
        d.name = inN.value.trim();
        if (d.name) setTimeout(function () { qGo(1); }, 220);
        else { hint.textContent = "이름이나 닉네임을 먼저 적어 주세요."; hint.classList.add("err"); inN.focus(); }
      }); });
      inN.addEventListener("input", function () { d.name = inN.value.trim(); hint.classList.remove("err"); hint.textContent = "이름을 적고 성별을 누르면 바로 다음으로 넘어가요."; if (d.name && d.gender) hint.textContent = "성별을 다시 누르면 다음으로 넘어가요."; });
      inN.addEventListener("keydown", function (e) { if (e.key === "Enter" && d.name && d.gender) qGo(1); });
    }
    if (n === 1) {
      var sy = document.getElementById("q-y"), sm = document.getElementById("q-m"), sd = document.getElementById("q-d"), tmr = null;
      qBody.querySelectorAll("[data-cal]").forEach(function (b) { b.addEventListener("click", function () {
        d.cal = b.dataset.cal; qBody.querySelectorAll("[data-cal]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        document.getElementById("q-leapWrap").hidden = d.cal !== "음력"; if (d.cal !== "음력") d.leap = false;
      }); });
      document.getElementById("q-leap").addEventListener("change", function (e) { d.leap = e.target.checked; });
      function upd() {
        [sy, sm, sd].forEach(function (x) { x.classList.toggle("empty", !x.value); });
        d.y = sy.value; d.m = sm.value; d.dd = sd.value;
        clearTimeout(tmr);
        if (!(d.y && d.m && d.dd)) return;
        var v = d.y + "." + String(d.m).padStart(2, "0") + "." + String(d.dd).padStart(2, "0"), err = validDate(v);
        hint.textContent = err || "좋아요. 다음으로 넘어갈게요."; hint.classList.toggle("err", !!err);
        if (!err) { d.birth = v; tmr = setTimeout(function () { qGo(2); }, 650); }
      }
      [sy, sm, sd].forEach(function (x) { x.addEventListener("change", upd); });
      [sy, sm, sd].forEach(function (x) { x.classList.toggle("empty", !x.value); });
    }
    if (n === 2) {
      document.getElementById("q-notime").addEventListener("click", function () { d.time = null; d.sj = null; qGo(3); });
      qBody.querySelectorAll("[data-sj]").forEach(function (b) { b.addEventListener("click", function () {
        d.sj = +b.dataset.sj; d.time = String((d.sj * 2) % 24).padStart(2, "0") + ":00"; qGo(3);
      }); });
    }
    if (n === 3) {
      qBody.querySelectorAll("[data-w]").forEach(function (b) { b.addEventListener("click", function () { qSubmit(b.dataset.w); }); });
      document.getElementById("q-wf").addEventListener("submit", function (e) { e.preventDefault(); qSubmit(document.getElementById("q-want").value.trim()); });
      document.getElementById("q-skip").addEventListener("click", function () { qSubmit(""); });
    }
  }
  function qSubmit(want) {
    var d = q.d;
    state = { name: d.name, gender: d.gender, cal: d.cal, leap: !!d.leap, birth: d.birth, time: d.time || null, sj: d.sj == null ? null : d.sj, status: "말하기 애매해", want: want || PR().defWant, email: "", prod: CUR };
    save(state); showLoading();
  }
  function scrollToQuick() {
    var el = document.getElementById("quick");
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: reduce ? "auto" : "smooth" });
  }
  document.querySelectorAll("[data-scroll]").forEach(function (b) { b.addEventListener("click", scrollToQuick); });
    if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { es.forEach(function (en) { document.getElementById("introBar").classList.toggle("away", en.isIntersecting); }); }, { threshold: .25 }).observe(document.getElementById("quick"));
  }

  /* ---------- 로딩 ---------- */
  function showLoading() {
    var wrap = document.createElement("div");
    wrap.className = "loading";
    wrap.innerHTML = '<div><div class="orbit"><span></span><span></span><span></span>' + dali() + '</div><p id="loadText">만세력으로 여덟 글자를 세우는 중</p><small>잠시만 기다려 줘요</small></div>';
    document.body.appendChild(wrap);
    var msgs = ["만세력으로 여덟 글자를 세우는 중", "오행의 균형을 재는 중", iga(PR().who) + " 첫 장을 쓰는 중"], i = 0;
    var iv = setInterval(function () { i++; if (i < msgs.length) document.getElementById("loadText").textContent = msgs[i]; }, 1000);
    setTimeout(function () { clearInterval(iv); wrap.remove(); go("result"); }, reduce ? 300 : 3100);
  }

  /* ---------- 결과 ---------- */
  /* ---------- 결제 전 무료 풀이: 정곡 한 줄 → 사주 근거 → 고른 고민에 대한 답 → 가장 궁금한 데서 끊기 ---------- */
  var HOOK = [
    "누구보다 먼저 손 내밀어 놓고, 정작 내가 힘들 땐 아무한테도 기대지 못하는 사람이에요.",
    "남의 기분은 귀신같이 알아채면서, 내 마음은 늘 맨 뒤로 미뤄 두는 사람이에요.",
    "어디서든 밝은 사람으로 통하지만, 혼자 있는 밤에 생각이 제일 많아지는 사람이에요.",
    "한 사람에게 깊이 마음을 주고, 그만큼 서운함도 오래 품고 가는 사람이에요.",
    "남한테는 괜찮다고 하면서, 혼자 있을 때 제일 많이 무너지는 사람이에요.",
    "모두를 챙기느라 정작 '나는 뭘 원하지?'라는 질문 앞에서 멈칫하는 사람이에요.",
    "한번 아니다 싶으면 뒤도 안 돌아보는 것 같지만, 사실은 그 결정을 제일 오래 곱씹는 사람이에요.",
    "기준이 높다는 말을 듣지만, 그 기준을 가장 엄하게 들이대는 상대는 자기 자신인 사람이에요.",
    "다 괜찮은 척 넘기는 게 익숙해서, 진짜 속마음은 아무도 모르게 깊이 가라앉혀 두는 사람이에요.",
    "말하지 않아도 분위기를 먼저 읽고, 그래서 늘 한발 먼저 지치는 사람이에요."];
  var WEAK_MEAN = [
    "힘들 때 기댈 사람을 찾기보다 혼자 버티는 쪽을 먼저 고르기 쉬워요",
    "하고 싶은 말을 삼키고 속으로 정리하는 데 익숙해요",
    "원하는 것을 손에 쥐는 일보다 남의 몫을 먼저 챙기기 쉬워요",
    "스스로 기준을 세우고 지켜야 하는 일이 많아서 피로가 조용히 쌓이기 쉬워요",
    "쉬어 가는 법을 몰라 충전 없이 달리는 날이 많아요"];
  function sharpHTML(o) {
    var P = o.P, me = ST_EL[P.day[0]], cnt = [0, 0, 0, 0, 0];
    [P.hour, P.day, P.month, P.year].forEach(function (p) { if (p) { cnt[ST_EL[p[0]]]++; cnt[BR_EL[p[1]]]++; } });
    var mn = Math.min.apply(null, cnt), wk = cnt.indexOf(mn), rel = mod(wk - me, 5);
    var why = o.why || ('일간이 <b>' + ST_KO[P.day[0]] + EL_KO[me] + '(' + ST[P.day[0]] + ')</b>, ' + DAY[P.day[0]].img + '이고, 여덟 글자에 <b>' + EL_NM[wk] + '(' + EL_HZ[wk] + ')</b> 기운이 ' + (mn === 0 ? '하나도 없어요' : '가장 적어요') + '. 그래서 ' + WEAK_MEAN[rel] + '.');
    var fog = '<div class="sh-fog" aria-hidden="true"><p>이 부분은 전체 풀이에서 여덟 글자를 하나씩 짚으며 이어서 설명해 드려요. 그 시기에 어떤 흐름이 오는지</p><p>그리고 그때 무엇을 먼저 해 두면 좋은지까지 함께 정리되어 있어요. 앞의 내용과 이어서</p></div>';
    return '<div class="sharp">' +
      '<p class="sh-kick">' + o.name + '님의 여덟 글자를 먼저 읽어 봤어요</p>' +
      '<p class="sh-hook">' + o.name + '님은, ' + HOOK[P.day[0]] + '</p>' +
      '<p class="sh-why"><span>왜 그런지</span>' + why + '</p>' +
      '<p class="sh-ans"><span>' + o.qLabel + '</span>' + o.answer + '</p>' +
      '<div class="sh-cut"><p>' + o.cliff + '<span class="cut">…</span></p>' + fog + '</div>' +
      '<button class="btn sh-go" type="button" data-unlock>이어서 읽기</button>' +
      '<p class="sh-note">아래 세 장은 무료로 먼저 보여 드려요</p></div>';
  }
  function renderResult(s) {
    CUR = PRODS[s.prod] ? s.prod : "love"; var LIFE = CUR === "life";
    if (CUR === "match" && s.pbirth) return renderMatch(s);
    if (CUR === "newyear") return renderNY(s);
    document.querySelectorAll(".price-now").forEach(function (el) { el.textContent = PR().price; });
    var P = pillarsOf(s.birth, s.time, s.cal, s.leap, s.sj);
    var me = DAY[P.day[0]], meKo = ST_KO[P.day[0]] + EL_KO[ST_EL[P.day[0]]];
    var cnt = [0, 0, 0, 0, 0], total = 0;
    [P.hour, P.day, P.month, P.year].forEach(function (p) { if (p) { cnt[ST_EL[p[0]]]++; cnt[BR_EL[p[1]]]++; total += 2; } });
    var maxI = cnt.indexOf(Math.max.apply(null, cnt)), minV = Math.min.apply(null, cnt), minI = cnt.indexOf(minV);
    var scale = Math.max(4, Math.max.apply(null, cnt));
    var today = new Date(), dstr = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, "0") + "." + String(today.getDate()).padStart(2, "0");
    var name = esc(s.name);

    function cell(stem, isStem) {
      if (stem == null) return '<div class="cell unknown-cell"><span class="hz">?</span><span class="ko">모름</span></div>';
      var el = isStem ? ST_EL[stem] : BR_EL[stem];
      return '<div class="cell el-' + el + '"><span class="hz">' + (isStem ? ST[stem] : BR[stem]) + '</span><span class="ko">' + (isStem ? ST_KO[stem] : BR_KO[stem]) + EL_KO[el] + '</span></div>';
    }
    var cols = [["시주", P.hour], ["일주", P.day, true], ["월주", P.month], ["년주", P.year]];
    var pillarsHTML = cols.map(function (c) {
      return '<div class="pillar"><span class="lab' + (c[2] ? " me" : "") + '">' + c[0] + (c[2] ? " · 나" : "") + '</span>' + cell(c[1] ? c[1][0] : null, true) + cell(c[1] ? c[1][1] : null, false) + '</div>';
    }).join("");
    var barsHTML = cnt.map(function (v, i) {
      return '<div class="bar"><span class="nm"><b>' + EL_HZ[i] + '</b>' + EL_NM[i] + '</span><span class="track"><span class="fill" data-w="' + (v / scale * 100) + '" style="width:0;background:var(' + EL_VAR[i] + ')"></span></span><span class="ct">' + v + '</span></div>';
    }).join("");
    var ticks = ""; for (var t = 0; t <= scale; t++) ticks += "<span>" + t + "</span>";
    var weakLine = minV === 0 ? EL_NM[minI] + "(" + EL_HZ[minI] + ")의 기운은 보이지 않아요" : EL_NM[minI] + "(" + EL_HZ[minI] + ")의 기운이 가장 적어요";
    var yr = today.getFullYear(), yrP = [mod(yr - 4, 10), mod(yr - 4, 12)];

    /* 결제 전 궁금증: 2027년 도화(桃花) 달 — 년지·일지(·시지) 기준 */
    var DOHWA = [9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3, 0]; // 申子辰→酉, 巳酉丑→午, 寅午戌→卯, 亥卯未→子
    var HAP = { 3: 10, 9: 4, 6: 7, 0: 1 };
    var dSet = {}; [P.year, P.day, P.hour].forEach(function (p) { if (p) dSet[DOHWA[p[1]]] = 1; });
    var dBr = Object.keys(dSet).map(Number); if (dBr.length === 1) dBr.push(HAP[dBr[0]]);
    var brMonth = function (b) { return b === 0 ? 12 : b === 1 ? 1 : b; };
    var dMon = dBr.map(brMonth).sort(function (a, b) { return a - b; });
    var SEASON = { 1: "한겨울", 3: "봄의 초입", 4: "봄의 한가운데", 6: "여름의 초입", 7: "한여름", 9: "가을의 초입", 10: "가을의 끝자락", 12: "겨울의 초입" };
    var NUMKO = ["", "한", "두", "세"];
    var LOCK_I = '<span class="cut">' + LOCK_SVG + '</span>';
    var monthsHTML = ""; for (var mm = 1; mm <= 12; mm++) monthsHTML += '<span class="' + (dMon.indexOf(mm) > -1 ? "mk" : "") + '">' + mm + '</span>';
    var teaseA = LIFE ? "" : '<div class="tease"><span class="tease-tag">한결이 먼저 짚어 본 것</span>' +
      '<p>' + name + '님, 2027년 열두 달 중 도화 기운이 짙어지는 달이 <b>' + NUMKO[dMon.length] + ' 번</b> 있습니다. 첫 번째는 ' + SEASON[dMon[0]] + ', <span class="hid">○○월</span>이죠. 두 번째는<span class="cut">…</span>' + LOCK_I + '</p></div>';
    var teaseB = name + "님 곁에 오래 머물 사람은 <b style=\"color:var(--moon)\">" + EL_NM[minI] + "(" + EL_HZ[minI] + ")의 기운</b>을 가진 사람일 가능성이 큽니다. 첫인상은 조용한데, 웃을 때 <span class=\"hid\">○○○○ ○○○</span><span class=\"cut\">…</span>" + LOCK_I;
    var teaseC = '<div class="talk" style="padding-top:18px"><div class="ava">' + dali() + '</div><div class="say-bubble">그대 사주에는 같은 매듭이 두 번 보입니다. 지난 인연이 멀어졌던 이유와, 다음에는 그 매듭을 피하는 방법이<span class="cut">…</span>' + LOCK_I + '</div></div>';

    if (LIFE) {
      /* 대운: 엔진이 절입 시각까지의 시간으로 계산한 대운 시작 해를 그대로 씁니다. */
      var dw = sajuOf(s.birth, s.time, s.cal, s.leap, s.sj, s.gender || "여성").daewoon, dwN = 0, remain = 0;
      for (var k = 0; k < dw.list.length; k++) { if (dw.list[k].startYear <= yr) dwN = k + 1; else { remain = dw.list[k].startYear - yr; break; } }
      var jae = (ST_EL[P.day[0]] + 2) % 5;
      teaseA = '<div class="tease"><span class="tease-tag">백운 선생이 먼저 짚어 본 것</span>' +
        '<p>' + name + ', 자네는 지금 ' + (dwN ? '<b>' + dwN + '번째</b> 물길' : '<b>첫 물길에 들기 전</b>') + ' 위에 있네. 다음 굽이까지 남은 해는 <b>' + remain + '년</b>. 그 굽이에서 달라지는 것은 <span class="hid">○○과 ○○</span>인데<span class="cut">…</span>' + LOCK_I + '</p></div>';
      teaseB = name + "의 재물 글자는 <b style=\"color:var(--moon)\">" + EL_NM[jae] + "(" + EL_HZ[jae] + ")</b>일세. 이 기운이 강해지는 해에 재물이 모이기 쉬운데, 자네에겐 그게 <span class=\"hid\">○○○○년</span><span class=\"cut\">…</span>" + LOCK_I;
      teaseC = '<div class="talk" style="padding-top:18px"><div class="ava">' + dali() + '</div><div class="say-bubble">자네 사주에는 같은 고비가 두 번 보이네. 첫 고비를 어떻게 넘겼는지가 두 번째 고비의 열쇠인데<span class="cut">…</span>' + LOCK_I + '</div></div>';
    }

    var T = s.talk || {}, qv = T["마음이 닫힌 이유"], lv = T["요즘 고민"];
    var LA = {
      "지난 연애의 상처": ["지난 연애가 아직 걸려 있다고 하셨죠.", name + "님 같은 사주는 상처를 빨리 잊은 척하지만, 다음 사람에게서 비슷한 신호가 보이면 먼저 문을 닫아 버리는 편이에요. 문제는 사람이 아니라 그 신호를 읽는 순서예요."],
      "높은 기준": ["혹시 눈이 높은 건지 물으셨죠.", "기준이 높은 게 아니라, 확신이 서기 전엔 마음을 열지 않는 거예요. 그래서 괜찮은 사람은 많았는데 '이 사람이다' 싶은 순간은 드물었던 거고요."],
      "여유 부족": ["바빠서 여유가 없다고 하셨죠.", "바쁜 것도 맞지만, 바쁨이 마음을 지키는 이유가 되어 주고 있을 가능성이 커요. 그런데 " + name + "님 사주엔 여유가 생기는 시기와 인연이 드는 시기가 겹치는 때가 있어요."]
    };
    var LF = {
      "일": ["요즘 일이 안 풀린다고 하셨죠.", name + "님 사주에서 일이 막히는 건 능력보다 시기의 문제일 때가 많아요. 지금은 거두기보다 심는 쪽에 가까운 흐름이라, 결과를 기다리는 사이에 먼저 지치기 쉬워요."],
      "사람": ["사람 때문에 힘들다고 하셨죠.", name + "님은 관계에서 늘 먼저 맞춰 주는 쪽이었을 거예요. 그래서 상대는 편했고, " + name + "님만 조금씩 닳았던 거죠."],
      "막막함": ["앞날이 막막하다고 하셨죠.", "막막함은 길이 없어서가 아니라 갈림길이 여러 개라서 생기는 경우가 많아요. " + name + "님 사주에는 실제로 방향이 바뀌는 지점이 보여요."]
    };
    var qa = LIFE ? (LF[lv] || ["삶의 방향이 궁금하셨죠.", "지금 서 있는 자리가 어디쯤인지 알면 조급함이 많이 줄어들어요."]) : (LA[qv] || ["인연이 언제 올지 궁금하셨죠.", name + "님의 인연은 요란하게 오기보다 조용히 스며드는 쪽이에요."]);
    var cliff = LIFE ? ("지금 " + name + "님은 " + (dwN ? dwN + "번째 큰 물길" : "첫 물길에 들기 전") + " 위에 있고, 다음 굽이까지 <b>" + remain + "년</b> 남았어요. 그 굽이에서 달라지는 건 <span class=\"hid\">○○과 ○○</span>인데")
      : ("2027년 열두 달 중 도화 기운이 짙어지는 달이 <b>" + NUMKO[dMon.length] + " 번</b> 있어요. 첫 번째는 " + SEASON[dMon[0]] + ", <span class=\"hid\">○○월</span>이에요. 그런데 그 달에 " + name + "님이 하지 말아야 할 한 가지가");
    var SHARP = sharpHTML({ name: name, P: P, qLabel: qa[0], answer: qa[1], cliff: cliff });
    var free =
      '<div class="r-head">' +
        '<span class="date">' + dstr + ' · ' + PR().title + ' · 무료 미리보기</span>' +
        '<h1 style="font-size:26px">' + name + (LIFE ? '님의 인생 지도' : '님의 연애 흐름') + '</h1>' +
        SHARP +
      '</div>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>한눈에 보는 핵심 요약</h2><span class="no">01</span></div>' +
        '<p class="image-line">' + name + '님은 <em>' + me.img + '</em> 같은 사람</p>' +
        '<div class="kw">' + me.kw.map(function (k, i) { return '<div><small>키워드 ' + (i + 1) + '</small><b>' + k + '</b></div>'; }).join("") + '</div>' +
        '<p>' + me.t + '</p></section>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>사주팔자 구성</h2><span class="no">02</span></div>' +
        '<p>태어난 날의 하늘 글자 <b style="color:var(--moon)">' + ST[P.day[0]] + '(' + meKo + ')</b>이 바로 ' + name + '님 자신이에요. ' + (s.time ? "여덟 글자를 모두 세웠어요." : "태어난 시간을 몰라 시주를 뺀 여섯 글자로 풀었어요.") + '</p>' +
        '<div class="pillars">' + pillarsHTML + '</div>' +
        '<div class="legend">' + EL_HZ.split("").map(function (h, i) { return '<span><i style="background:var(' + EL_VAR[i] + ')"></i>' + h + ' ' + EL_NM[i] + '</span>'; }).join("") + '</div>' +
        '<p class="note">' + calcNote(P, s.cal) + '</p></section>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>오행 균형</h2><span class="no">03</span></div>' +
        '<div class="bars">' + barsHTML + '<div class="bar-scale"><span></span><div>' + ticks + '</div><span></span></div></div>' +
        '<div class="talk"><div class="ava">' + dali() + '</div><div class="say-bubble">' + total + '글자 중에 ' + EL_NM[maxI] + '(' + EL_HZ[maxI] + ')의 기운이 가장 많고, ' + weakLine + (LIFE ? '. ' + WEAK_TIP[minI] + '을 채우는 습관과 사람을 곁에 두면 삶의 균형이 한결 편해질 걸세.' : '. 연애에서는 ' + WEAK_TIP[minI] + '을 채워 주는 사람이 곁에 있을 때 마음이 편해지기 쉽습니다.') + '</div></div></section>';

    var L = LIFE ? [
      [4, "타고난 성격과 그릇", meKo + " 일간인 자네는 겉은 단단해 보여도 속으로는 생각이 많은 사람일세.", '<p>어떤 자리에서 힘이 붙고 어떤 자리에서 쉽게 지치는지, 타고난 그릇의 크기와 모양을 장면으로 그려 두었네.</p><p>강점 세 가지와 조심할 버릇 두 가지를 적었네.</p>'],
      [5, "십성으로 보는 관계·일·돈", "자네 사주에서 일과 돈을 뜻하는 글자가 어느 자리에 앉았는지부터 보세.", '<p>월주에 자리한 기운은 사회에서의 자리와 이어져 있네. 사람을 얻는 방식과 돈을 쓰는 방식도 여기서 읽히지.</p>'],
      [6, "일과 재물의 길", teaseB, '<p>잘 맞는 일의 형태, 동업과 독립 중 어느 쪽이 편한지, 재물이 새는 구멍이 어디인지 차례로 짚었네.</p>'],
      [7, "10년 대운 타임라인", yr + "년 지금, 자네가 지나는 물길부터 짚어 보세.", '<div class="mini-timeline"><div></div><div></div><div></div><div></div><div></div></div><p>대운이 바뀌는 해와, 그때 달라지는 일·재물·관계의 결을 10년 단위로 펼쳐 두었네.</p>'],
      [8, "인생의 계절별 조언", "청년, 중년, 노년마다 힘을 줄 곳과 뺄 곳을 나눠 두었네.", '<div class="mini-cal"><div></div><div class="hi"></div><div></div><div></div><div class="hi"></div><div></div><div></div><div></div><div class="hi"></div><div></div><div></div><div></div></div><p>돛을 올리기 좋은 때와 노를 쉬어도 좋은 때를 계절로 비유해 적었네.</p>'],
      [9, "실생활 조언", "오늘부터 해 볼 만한 작은 습관 다섯 가지일세.", '<p>☐ 하루를 여는 습관 ☐ 돈을 다루는 원칙 ☐ 곁에 둘 사람 ☐ 쉬어 가는 법 ☐ 피하면 좋은 말버릇</p>'],
      [10, "“" + esc(s.want) + "”에 대한 백운 선생의 답", name + "님, 이 물음은 내가 가장 오래 붙들고 읽었네.", '<p>지금 물길에서 가장 가능성이 큰 방향과, 그 물길을 자네 쪽으로 끌어오는 방법을 이야기하겠네. 날짜를 못 박기보다 어느 때, 어떤 마음가짐이 좋은지 짚어 주겠네.</p>']
    ] : [
      [4, "타고난 성격과 기질", meKo + " 일간인 " + name + "님은 겉으로 보이는 모습과 속마음의 온도가 조금 달라요.", '<p>처음 만난 사람에게는 차분하고 단단해 보이지만, 가까워질수록 장난스럽고 여린 면이 드러나요. 이 차이가 매력이 되기도 하고 오해가 되기도 해요.</p><p>강점 세 가지와 주의할 점 두 가지를 장면으로 정리했어요.</p>'],
      [5, "십성으로 보는 관계·일·돈", "사주에서 인연을 뜻하는 글자가 어느 자리에 앉아 있는지부터 볼게요.", '<p>월주에 자리한 기운은 사회에서 만나는 인연과 이어져 있어요. 일과 사랑의 균형을 맞추는 방식도 여기서 읽혀요.</p><p>돈을 쓰는 방식이 관계에 주는 영향도 함께 봐요.</p>'],
      [6, "연애운의 흐름", teaseB, '<p>끌리는 사람의 유형, 반복되는 갈등의 모양, 관계가 깊어지는 계기를 차례로 짚어요.</p><p>잘 맞는 오행을 가진 사람의 말투와 행동을 구체적으로 그려 드려요.</p>'],
      [7, "올해와 앞으로 10년의 흐름", yr + "년은 " + ST_KO[yrP[0]] + BR_KO[yrP[1]] + "년, " + EL_NM[ST_EL[yrP[0]]] + "의 기운이 강한 해예요.", '<div class="mini-timeline"><div></div><div></div><div></div><div></div><div></div></div><p>대운이 바뀌는 시점과 그때 달라지는 관계의 결을 10년 타임라인으로 보여 드려요.</p>'],
      [8, "2027년 열두 달 인연 달력", "인연의 기운이 강해지는 달과 쉬어 가면 좋은 달을 나눠 봤어요.", '<div class="mini-cal"><div></div><div class="hi"></div><div></div><div></div><div class="hi"></div><div></div><div></div><div></div><div class="hi"></div><div></div><div></div><div></div></div><p>달마다 해 보면 좋은 일과 조심하면 좋은 말 습관을 적었어요.</p>'],
      [9, "실생활 조언", "오늘부터 해 볼 수 있는 작은 습관 다섯 가지예요.", '<p>☐ 마음을 표현하는 타이밍 ☐ 연락의 리듬 ☐ 나를 채우는 시간 ☐ 만남의 장소 ☐ 피하면 좋은 말버릇</p>'],
      [10, "“" + esc(s.want) + "”에 대한 한결의 답", name + "님, 이 질문은 가장 공들여 읽었습니다.", '<p>지금 흐름에서 가장 가능성이 큰 방향과, 그 흐름을 당신 쪽으로 당겨 오는 방법을 이야기하죠. 날짜를 못 박기보다 언제, 어디서, 어떤 마음일 때가 좋은지 짚어 드리겠습니다.</p>']
    ];
    var locked = '<div class="locked-wrap">' + L.map(function (l, i) {
      var card = i === 1 ? '<div class="unlock-card"><div class="lock-ic">' + LOCK_SVG + '</div><b style="font-family:var(--f-display);font-size:17px">나머지 7개 장이 기다리고 있어요</b><p>' + (LIFE ? '성격과 그릇, 일과 재물, 10년 대운, 계절별 조언, 그리고 고른 질문에 대한 답까지' : '성격, 연애 흐름, 10년 운, 시기별 조언, 그리고 고른 질문에 대한 답까지') + '</p><span class="price">' + PR().price + '</span><button class="btn" type="button" data-unlock style="width:100%">전체 풀이 열기</button></div>' : "";
      if (l[0] === 10) card += teaseC;
      return card + '<div class="locked-sec"><div class="r-sec-head"><h3>' + l[1] + '</h3><span class="badge lock">' + LOCK_SVG + String(l[0]).padStart(2, "0") + '</span></div><p class="first' + (l[0] === 6 ? ' tease-line' : '') + '">' + l[2] + '</p><div class="blur" aria-hidden="true">' + l[3] + '</div></div>';
    }).join("") + '</div>';

    var closing = '<section class="r-sec" style="border-top:0"><div class="r-sec-head"><h2>' + (LIFE ? '마무리 서찰' : '마무리 편지') + '</h2><span class="no">11</span></div>' +
      '<div class="talk"><div class="ava">' + dali() + '</div><div class="say-bubble">' + name + (LIFE ? '님, 사주는 정해진 길이 아니라 물길의 방향일세. 노를 젓는 건 언제나 자네 몫이네. 서두르지 말고, 오늘 하루부터 잘 살아 보게.' : '님, 사주는 정해진 답이 아니라 지금 부는 바람의 방향입니다. 나침반은 방향을 알려 줄 뿐, 걸음은 늘 당신이 정하죠. 오늘 밤은 편히 쉬어요.') + '</div></div>' +
      '<div class="disclaimer"><b>안내</b>이 풀이는 참고용이에요. 특정 결과를 보장하지 않으며, 건강·투자·법률 등 중요한 결정은 전문가와 상의해 주세요. 마음이 많이 힘들 땐 자살예방상담전화 109(24시간)에서 이야기를 들어 줘요.</div></section>' +
      '<div style="height:120px"></div>';

    document.getElementById("resultBody").innerHTML = free + locked + closing;
    document.querySelectorAll("[data-unlock]").forEach(function (b) { b.addEventListener("click", openSheet); });
    requestAnimationFrame(function () { setTimeout(function () {
      document.querySelectorAll(".bar .fill").forEach(function (f) { f.style.width = f.dataset.w + "%"; });
    }, 120); });
  }

  function talkHTML(s) {
    var t = s.talk || {}, ks = Object.keys(t); if (!ks.length) return "";
    return '<p class="talk-cap">' + esc(iga(PR().who)) + ' 풀이에 반영할 대화</p><div class="talk-chips">' + ks.map(function (k) { return '<span><b>' + esc(k) + '</b>' + esc(t[k]) + '</span>'; }).join("") +
      '<span><b>지금</b>' + esc(s.status || "") + '</span></div>';
  }
  /* ---------- 2027 신년운세 결과 ---------- */
  function nyCalc(s) {
    var P = pillarsOf(s.birth, s.time, s.cal, s.leap, s.sj);
    var me = ST_EL[P.day[0]], cnt = [0, 0, 0, 0, 0];
    [P.hour, P.day, P.month, P.year].forEach(function (p) { if (p) { cnt[ST_EL[p[0]]]++; cnt[BR_EL[p[1]]]++; } });
    function rel(e) { return mod(e - me, 5); } // 0 비견 1 식상 2 재성 3 관성 4 인성
    var strong = cnt[me] + cnt[mod(me - 1, 5)] >= 4, good = strong ? [1, 2, 3] : [0, 4];
    var HAP6 = { 0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6 }, db = P.day[1];
    var months = [];
    for (var m = 1; m <= 12; m++) {
      var mp = calcPillars(2027, m, 20).month, rs = rel(ST_EL[mp[0]]), rb = rel(BR_EL[mp[1]]);
      var sc = 62 + (good.indexOf(rs) >= 0 ? 13 : -5) + (good.indexOf(rb) >= 0 ? 9 : -4) + (HAP6[db] === mp[1] ? 8 : 0) + (Math.abs(db - mp[1]) === 6 ? -14 : 0) + ((m * 7 + P.day[0] * 3) % 5) - 2;
      months.push({ m: m, sc: Math.max(35, Math.min(95, sc)), rs: rs, rb: rb, chung: Math.abs(db - mp[1]) === 6, br: mp[1] });
    }
    var best = months.slice().sort(function (a, c) { return c.sc - a.sc; })[0];
    var low = months.filter(function (x) { return x.sc <= 52 || x.chung; }).sort(function (a, c) { return a.sc - c.sc; });
    if (!low.length) low = months.slice().sort(function (a, c) { return a.sc - c.sc; }).slice(0, 1);
    low = low.slice(0, 3).sort(function (a, c) { return a.m - c.m; });
    function cntRel(r) { var n = 0; months.forEach(function (x) { if (x.rs === r) n++; if (x.rb === r) n++; }); return n; }
    var yr = rel(ST_EL[3]), yb = rel(BR_EL[7]), fem = s.gender === "여성";
    function cl(v) { return Math.max(46, Math.min(94, Math.round(v))); }
    var dohwa = months.filter(function (x) { return [0, 3, 6, 9].indexOf(x.br) >= 0; }).length;
    var areas = [
      ["재물", cl(58 + cntRel(2) * 4 + (yr === 2 || yb === 2 ? 8 : 0) + (good.indexOf(2) >= 0 ? 6 : 0))],
      ["인연", cl(56 + cntRel(fem ? 3 : 2) * 3 + dohwa * 2 + (yr === (fem ? 3 : 2) ? 8 : 0))],
      ["일", cl(57 + cntRel(3) * 3 + cntRel(1) * 2 + (yr === 3 || yr === 1 ? 7 : 0))],
      ["건강", cl(80 - months.filter(function (x) { return x.chung; }).length * 6 - (Math.min.apply(null, cnt) === 0 ? 8 : 0) + (strong ? 2 : 4))]
    ];
    var minI = cnt.indexOf(Math.min.apply(null, cnt));
    return { P: P, me: me, cnt: cnt, months: months, best: best, low: low, areas: areas, yr: yr, luck: minI };
  }
  function renderNY(s) {
    document.querySelectorAll(".price-now").forEach(function (el) { el.textContent = PR().price; });
    var C = nyCalc(s), P = C.P, name = esc(s.name), meKo = ST_KO[P.day[0]] + EL_KO[C.me];
    var today = new Date(), dstr = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, "0") + "." + String(today.getDate()).padStart(2, "0");
    function cell(stem, isStem) {
      if (stem == null) return '<div class="cell unknown-cell"><span class="hz">?</span><span class="ko">모름</span></div>';
      var el = isStem ? ST_EL[stem] : BR_EL[stem];
      return '<div class="cell el-' + el + '"><span class="hz">' + (isStem ? ST[stem] : BR[stem]) + '</span><span class="ko">' + (isStem ? ST_KO[stem] : BR_KO[stem]) + EL_KO[el] + '</span></div>';
    }
    var pillars = '<div class="pillars">' + [["시주", P.hour], ["일주", P.day, true], ["월주", P.month], ["년주", P.year]].map(function (c) {
      return '<div class="pillar"><span class="lab' + (c[2] ? " me" : "") + '">' + c[0] + (c[2] ? " · 나" : "") + '</span>' + cell(c[1] ? c[1][0] : null, true) + cell(c[1] ? c[1][1] : null, false) + '</div>'; }).join("") + '</div>';
    var REL = [["같은 기운이 곁에 서는 해", "내 뜻대로 밀고 나가기 좋은 흐름입니다. 다만 비슷한 사람과 부딪히기도 쉬우니, 힘을 모을 사람을 고르는 눈이 중요합니다."],
      ["안의 것을 밖으로 꺼내는 해", "표현하고, 만들고, 보여 줄수록 기회가 붙는 흐름입니다. 미뤄 둔 계획을 꺼내 보시기 좋습니다."],
      ["손에 잡히는 결과를 쫓는 해", "재물과 현실 감각이 살아나는 흐름입니다. 다만 욕심이 앞서면 새는 곳도 생기니 들어오는 만큼 지키는 법이 필요합니다."],
      ["역할과 책임이 커지는 해", "인정받을 자리가 생기는 대신 부담도 함께 옵니다. 맡을 것과 내려놓을 것을 나누면 한결 가벼워집니다."],
      ["나를 받쳐 주는 기운이 드는 해", "배우고, 자격을 갖추고, 도움을 받기 좋은 흐름입니다. 혼자 다 하려 하기보다 손을 빌리시면 더 멀리 갑니다."]][C.yr];
    var pickV = (s.talk || {})["가장 중요한 것"] || "재물", pickI = Math.max(0, ["재물", "인연", "일"].indexOf(pickV));
    var LOCK_I = '<span class="cut">' + LOCK_SVG + '</span>';
    var areasHTML = '<div class="ny-areas">' + C.areas.map(function (a, i) { var open = i === pickI;
      return '<div class="ny-area' + (open ? " pick" : " lk") + '"><span class="nm">' + a[0] + '</span><span class="track"><span class="fill" data-w="' + (open ? a[1] : 60) + '" style="width:0"></span></span><span class="sc">' + (open ? a[1] : "??") + '</span></div>'; }).join("") + '</div>';
    var teaseA = '<div class="tease tease-img"><div class="ti-art"><img src="' + IMG["/media/n-letter.jpg"] + '" alt="붉은 양 문양 봉랍의 편지를 내미는 연지" style="object-position:50% 46%"></div><div class="ti-body" data-vo="ny_res02"><span class="tease-tag">연지가 먼저 열어 본 편지</span>' +
      '<p>' + name + '님의 2027년, 가장 기운이 차는 달은 <span class="hid">○월</span>입니다. 그리고 한 박자 쉬어 가실 달이 <b>' + C.low.length + '번</b> 있습니다. 그중 첫 번째가 <span class="hid">○월</span>인데<span class="cut">…</span>' + LOCK_I + '</p></div></div>';
    var NQ = { "재물": ["재물이 제일 궁금하다고 하셨죠.", "2027년 " + name + "님의 재물 흐름은 <b>" + C.areas[0][1] + "점</b>이에요. 들어오는 운보다 새는 곳을 막는 쪽이 더 크게 작용하는 해라서, 어디서 새는지를 먼저 아는 게 중요해요."],
      "인연": ["사람과 인연이 궁금하다고 하셨죠.", "정미년의 불은 " + name + "님에게 사람을 데려오는 쪽으로 움직여요. 다만 새로 오는 사람보다, 이미 아는 사람과의 거리가 먼저 달라질 가능성이 커요."],
      "일": ["일과 진로가 궁금하다고 하셨죠.", "2027년은 " + name + "님에게 역할이 커지는 흐름이에요. 인정받을 기회와 부담이 같은 달에 함께 오기 쉬워서, 무엇을 맡고 무엇을 내려놓을지가 한 해를 가릅니다."] };
    var nq = NQ[pickV] || NQ["재물"];
    var SHARP = sharpHTML({ name: name, P: P, qLabel: nq[0], answer: nq[1], cliff: "가장 기운이 차는 달은 <span class=\"hid\">○월</span>, 쉬어 가실 달은 <b>" + C.low.length + "번</b> 있어요. 그중 첫 번째 달에 " + name + "님이 먼저 해야 할 일은" });
    var free =
      '<div class="r-head"><span class="date">' + dstr + ' · 2027 신년운세 · 무료 미리보기</span>' +
        '<h1 style="font-size:26px">' + name + '님의 정미년</h1>' +
        SHARP + '</div>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>정미년과 당신</h2><span class="no">01</span></div>' +
        '<div class="duo"><div><small>' + name + '님의 일간</small><b>' + ST[P.day[0]] + '</b><small>' + meKo + '</small></div><span class="amp" style="color:var(--cinnabar);font-size:17px">與</span><div><small>2027년</small><b>丁未</b><small>붉은 양의 해</small></div></div>' +
        '<p><b>' + REL[0] + '.</b> ' + REL[1] + '</p></section>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>사주팔자 구성</h2><span class="no">02</span></div>' + pillars +
        '<p class="note">' + calcNote(P, s.cal) + '</p></section>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>분야별 흐름</h2><span class="no">03</span></div>' + areasHTML +
        '<div class="talk"><div class="ava">' + dali() + '</div><div class="say-bubble" data-vo="ny_res03">가장 궁금해하신 ' + C.areas[pickI][0] + '부터 열어 두었습니다. 나머지 세 갈래는 봉인 안에 있습니다.</div></div></section>';
    var COLOR = [["초록", "동쪽", "3, 8"], ["붉은색", "남쪽", "2, 7"], ["황토색", "가운데", "5, 10"], ["흰색", "서쪽", "4, 9"], ["남색", "북쪽", "1, 6"]][C.luck];
    var calHTML = '<div class="ny-cal">' + C.months.map(function (x) { return '<div class="' + (x.m === C.best.m ? "hi" : C.low.some(function (l) { return l.m === x.m; }) ? "lo" : "") + '">' + x.m + '월</div>'; }).join("") + '</div>';
    var L = [
      [4, "열두 달 운세 달력", "가장 기운이 차는 달은 <span class=\"hid\">○월</span>, 쉬어 가실 달은 " + C.low.length + "번입니다.", calHTML + '<p>달마다 밀고 나갈 일과 미뤄 둘 일을 한 줄씩 적어 두었습니다.</p>'],
      [5, "재물운", "재물이 드는 달과 새는 달이 따로 있습니다.", '<p>들어오는 시기, 지키는 법, 큰돈을 쓰기 전에 살필 것까지 짚어 드립니다.</p>'],
      [6, "인연과 관계", "2027년, 사람이 가까워지는 흐름이 한 번 크게 옵니다.", '<p>새 인연이 드는 시기와 지금 곁에 있는 사람과의 흐름을 함께 봅니다.</p>'],
      [7, "일과 진로", "일이 움직이는 달에는 표시를 해 두었습니다.", '<p>옮기기 좋은 때, 버티면 좋은 때, 인정받기 쉬운 때를 나눠 드립니다.</p>'],
      [8, "건강과 컨디션", "몸이 먼저 신호를 보내는 달이 있습니다.", '<p>무리하기 쉬운 시기와 쉬어 가면 좋은 습관을 적었습니다. 건강 진단은 아니니 참고로만 보세요.</p>'],
      [9, "행운의 색과 방향", "정미년에 " + name + "님을 돕는 색은 <span class=\"hid\">○○○</span>입니다.", '<div class="ny-lucky"><div><small>행운의 색</small><b>' + COLOR[0] + '</b></div><div><small>방향</small><b>' + COLOR[1] + '</b></div><div><small>숫자</small><b>' + COLOR[2] + '</b></div></div>'],
      [10, "“" + esc(s.want) + "”에 대한 연지의 답", name + "님, 이 편지는 제가 가장 오래 붙들고 있었습니다.", '<p>2027년 흐름에서 가장 가능성이 큰 방향과, 그 흐름을 좋은 쪽으로 당기는 방법을 적었습니다. 결과를 단정하기보다 어떤 때, 어떤 마음이 좋은지 짚어 드립니다.</p>']
    ];
    var teaseC = '<div class="talk" style="padding-top:18px"><div class="ava">' + dali() + '</div><div class="say-bubble" data-vo="ny_res04">쉬어 가실 달 중 한 달에는, 큰 결정보다 먼저 하셔야 할 일이 하나 있습니다. 그게 무엇이냐면<span class="cut">…</span>' + LOCK_I + '</div></div>';
    var locked = '<div class="locked-wrap">' + L.map(function (l, i) {
      var card = i === 1 ? '<div class="unlock-card"><div class="lock-ic">' + LOCK_SVG + '</div><b style="font-family:var(--f-display);font-size:17px">봉인된 편지 7장이 남아 있습니다</b><p>열두 달 달력, 재물, 인연, 일, 건강, 행운의 색, 그리고 고르신 질문의 답까지</p><span class="price">' + PR().price + '</span><button class="btn" type="button" data-unlock style="width:100%">봉인 풀기</button></div>' : '';
      if (l[0] === 10) card += teaseC;
      return card + '<div class="locked-sec"><div class="r-sec-head"><h3>' + l[1] + '</h3><span class="badge lock">' + LOCK_SVG + String(l[0]).padStart(2, "0") + '</span></div><p class="first"' + (l[0] === 10 ? ' data-vo="ny_res05"' : '') + '>' + l[2] + '</p><div class="blur" aria-hidden="true">' + l[3] + '</div></div>';
    }).join("") + '</div>';
    var closing = '<section class="r-sec" style="border-top:0"><div class="r-sec-head"><h2>연지의 덕담 편지</h2><span class="no">11</span></div>' +
      '<div class="talk"><div class="ava">' + dali() + '</div><div class="say-bubble" data-vo="ny_res06">한 해의 운은 정해진 길이 아니라 미리 읽어 둔 날씨에 가깝습니다. 우산을 챙기는 것도, 햇볕을 쬐러 나가는 것도 결국 ' + name + '님의 몫입니다. 정미년, 평안하십시오.</div></div>' +
      '<div class="disclaimer"><b>안내</b>이 풀이는 참고용이에요. 특정 결과를 보장하지 않으며, 건강·재정의 중요한 결정은 전문가와 상의해 주세요. 마음이 많이 힘들 땐 자살예방상담전화 109(24시간)에서 이야기를 들어 줘요.</div></section><div style="height:120px"></div>';
    document.getElementById("resultBody").innerHTML = free + locked + closing;
    voWatch(document.getElementById("resultBody"));
    document.querySelectorAll("[data-unlock]").forEach(function (b) { b.addEventListener("click", openSheet); });
    requestAnimationFrame(function () { setTimeout(function () { document.querySelectorAll(".ny-area .fill").forEach(function (f) { f.style.width = f.dataset.w + "%"; }); }, 120); });
  }
  /* ---------- 궁합 결과 ---------- */
  function renderMatch(s) {
    document.querySelectorAll(".price-now").forEach(function (el) { el.textContent = PR().price; });
    var A = pillarsOf(s.birth, s.time, s.cal, s.leap, s.sj), B = pillarsOf(s.pbirth, s.ptime, s.pcal, s.pleap, s.psj), name = esc(s.name), pn = esc(s.pname);
    var today = new Date(), dstr = today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, "0") + "." + String(today.getDate()).padStart(2, "0");
    function cell(stem, isStem) {
      if (stem == null) return '<div class="cell unknown-cell"><span class="hz">?</span><span class="ko">모름</span></div>';
      var el = isStem ? ST_EL[stem] : BR_EL[stem];
      return '<div class="cell el-' + el + '"><span class="hz">' + (isStem ? ST[stem] : BR[stem]) + '</span><span class="ko">' + (isStem ? ST_KO[stem] : BR_KO[stem]) + EL_KO[el] + '</span></div>';
    }
    function pillars(P, who) { return '<div class="pillars">' + [["시주", P.hour], ["일주", P.day, true], ["월주", P.month], ["년주", P.year]].map(function (c) {
      return '<div class="pillar"><span class="lab' + (c[2] ? " me" : "") + '">' + c[0] + (c[2] ? " · " + who : "") + '</span>' + cell(c[1] ? c[1][0] : null, true) + cell(c[1] ? c[1][1] : null, false) + '</div>'; }).join("") + '</div>'; }
    var cnt = [0, 0, 0, 0, 0], total = 0;
    [A, B].forEach(function (P) { [P.hour, P.day, P.month, P.year].forEach(function (p) { if (p) { cnt[ST_EL[p[0]]]++; cnt[BR_EL[p[1]]]++; total += 2; } }); });
    var maxI = cnt.indexOf(Math.max.apply(null, cnt)), minI = cnt.indexOf(Math.min.apply(null, cnt)), scale = Math.max(4, Math.max.apply(null, cnt));
    var barsHTML = cnt.map(function (v, i) { return '<div class="bar"><span class="nm"><b>' + EL_HZ[i] + '</b>' + EL_NM[i] + '</span><span class="track"><span class="fill" data-w="' + (v / scale * 100) + '" style="width:0;background:var(' + EL_VAR[i] + ')"></span></span><span class="ct">' + v + '</span></div>'; }).join("");
    var ticks = ""; for (var t = 0; t <= scale; t++) ticks += "<span>" + t + "</span>";
    var ea = ST_EL[A.day[0]], eb = ST_EL[B.day[0]], da = DAY[A.day[0]], db = DAY[B.day[0]];
    var rel = ea === eb ? ["서로 닮은", "같은 기운이라 말하지 않아도 통하는 대신, 고집이 부딪히면 둘 다 물러서지 않기 쉬워요."] :
      (ea + 1) % 5 === eb ? ["당신이 채워 주는", "당신의 기운이 그 사람을 키워 주는 관계예요. 다만 주는 쪽이 지치지 않게 균형이 필요해요."] :
      (eb + 1) % 5 === ea ? ["그 사람이 채워 주는", "그 사람의 기운이 당신을 받쳐 주는 관계예요. 기대는 만큼 고마움을 표현할 때 오래가요."] :
      (ea + 2) % 5 === eb ? ["당신이 이끄는", "당신이 그 사람을 다잡는 기운이에요. 끌림이 강한 만큼, 말투 하나에 서운함이 생기기 쉬워요."] :
      ["그 사람이 이끄는", "그 사람이 당신을 다잡는 기운이에요. 긴장감이 설렘이 되기도 하고, 부담이 되기도 해요."];
    var HAP6 = { 0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6 }, ba = A.day[1], bb = B.day[1];
    var br = HAP6[ba] === bb ? "합(合)" : Math.abs(ba - bb) === 6 ? "충(沖)" : "잔잔한";
    var LOCK_I = '<span class="cut">' + LOCK_SVG + '</span>';
    var teaseA = '<div class="tease tease-img"><div class="ti-art"><img src="' + IMG["/media/m-letter.jpg"] + '" alt="붉은 봉인의 서찰을 입가에 댄 홍연"><span class="ti-seal"></span></div><div class="ti-body" data-vo="hy_res02"><span class="tease-tag">홍연이 먼저 짚어 본 것</span>' +
      '<p>' + name + '님과 ' + pn + '님은 일간끼리 <b>' + rel[0] + '</b> 사이예요. 그리고 두 사람의 일지엔 <b>' + br + '</b> 기운이 하나 보여요. 이게 두 사람 사이에서 <span class="hid">○○○○○</span>로 나타나는데<span class="cut">…</span>' + LOCK_I + '</p></div></div>';
    var T = s.talk || {}, mq = T["갈라지는 이유"];
    var MQ = { "내 탓일까 걱정": ["혹시 내 탓일까 걱정된다고 하셨죠.", "두 사람 사주를 나란히 놓으면 " + name + "님이 먼저 참고, 먼저 맞추는 구조예요. 그래서 문제가 생기면 자책부터 하게 되는 거고요. 누구 탓이 아니라 기운이 흐르는 방향의 문제예요."],
      "상대 쪽이라 생각": ["그 사람 쪽 문제라고 보셨죠.", "반은 맞아요. " + pn + "님 기질이 먼저 거리를 두는 쪽이긴 해요. 그런데 그 거리가 생기는 순간, " + name + "님이 보이는 반응이 매번 같아요."] };
    var mqa = MQ[mq] || ["두 사람의 앞날이 궁금하셨죠.", "두 사람은 끌리는 이유와 부딪히는 이유가 같은 곳에 있어요."];
    var SHARP = sharpHTML({ name: name, P: A, qLabel: mqa[0], answer: mqa[1],
      why: "두 사람은 일간끼리 <b>" + rel[0] + "</b> 사이이고, 일지에는 <b>" + br + "</b> 기운이 보여요. " + rel[1],
      cliff: "두 사람 사이에서 같은 장면이 두 번 반복돼요. 두 번째 장면에서 누가 먼저 손을 내미느냐에 따라 <span class=\"hid\">○○○○○</span>" });
    var free =
      '<div class="r-head"><span class="date">' + dstr + ' · 궁합사주 · 무료 미리보기</span>' +
        '<h1 style="font-size:26px">' + name + ' <span style="color:#e88">♥</span> ' + pn + '</h1>' +
        SHARP + '</div>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>한눈에 보는 두 사람</h2><span class="no">01</span></div>' +
        '<div class="duo"><div><small>' + name + '</small><b>' + ST[A.day[0]] + '</b><small>' + da.img + '</small></div><span class="amp">♥</span><div><small>' + pn + '</small><b>' + ST[B.day[0]] + '</b><small>' + db.img + '</small></div></div>' +
        '<p>' + rel[1] + '</p></section>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>두 사람의 사주팔자</h2><span class="no">02</span></div>' +
        '<p class="p-who">' + name + '님</p>' + pillars(A, "나") + '<p class="p-who">' + pn + '님</p>' + pillars(B, "상대") +
        '<p class="note">' + calcNote(A, s.cal) + '</p></section>' +
      '<section class="r-sec"><div class="r-sec-head"><h2>합쳐 본 오행</h2><span class="no">03</span></div>' +
        '<div class="bars">' + barsHTML + '<div class="bar-scale"><span></span><div>' + ticks + '</div><span></span></div></div>' +
        '<div class="talk"><div class="ava">' + dali() + '</div><div class="say-bubble" data-vo="hy_res03">두 사람을 합치면 ' + EL_NM[maxI] + '(' + EL_HZ[maxI] + ')의 기운이 가장 많고, ' + EL_NM[minI] + '(' + EL_HZ[minI] + ')이 가장 적어요. 함께 있을 때 ' + WEAK_TIP[minI] + '을 의식해서 채우면 훨씬 편해져요.</div></div></section>';
    var L = [
      [4, "두 사람의 기질 비교", pn + "님은 겉으로는 " + db.kw[0] + " 사람처럼 보여도, 속으로는 <span class=\"hid\">○○○○○○</span><span class=\"cut\">…</span>" + LOCK_I, '<p>두 사람이 화날 때, 서운할 때, 기쁠 때 각각 어떻게 반응하는지 나란히 놓고 봐요.</p>'],
      [5, "끌림과 부딪힘", "두 사람이 서로에게 끌리는 지점은 분명해요. 문제는 부딪히는 지점이죠.", '<p>오행이 서로를 채우는 곳과 깎는 곳을 짚고, 다툼이 반복되는 장면을 구체적으로 그려요.</p>'],
      [6, "관계의 흐름", "지금 두 사람의 실은 어느 쪽으로 당겨지고 있을까요?", '<div class="mini-timeline"><div></div><div></div><div></div><div></div><div></div></div><p>가까워지기 쉬운 시기와 거리를 두면 좋은 시기를 흐름으로 보여 줘요.</p>'],
      [7, "두 사람의 2027년", "2027년, 두 사람에게 같이 오는 기운이 하나 있어요.", '<div class="mini-cal"><div></div><div class="hi"></div><div></div><div></div><div class="hi"></div><div></div><div></div><div></div><div class="hi"></div><div></div><div></div><div></div></div><p>달마다 함께 해 보면 좋은 일과 조심하면 좋은 말을 적었어요.</p>'],
      [8, "오래 가는 법", "두 사람이 오래 가려면 딱 하나만 지키면 돼요.", '<p>☐ 연락의 리듬 ☐ 다툰 뒤 먼저 말 거는 쪽 ☐ 돈 쓰는 방식 ☐ 서로의 혼자 시간</p>'],
      [9, "그 사람 마음을 여는 말", pn + "님 마음을 여는 말은 의외로 짧아요.", '<p>상대의 일간에 맞는 말투, 피해야 할 말, 마음이 열리는 타이밍까지.</p>'],
      [10, "“" + esc(s.want) + "”에 대한 홍연의 답", name + "님, 이 질문은 제가 제일 오래 봤어요.", '<p>지금 두 사람의 흐름에서 가장 가능성이 큰 방향과, 그 흐름을 좋은 쪽으로 당기는 방법을 이야기할게요. 결과를 단정하기보다 어떤 때, 어떤 마음이 좋은지 짚어 줄게요.</p>']
    ];
    var teaseC = '<div class="talk" style="padding-top:18px"><div class="ava">' + dali() + '</div><div class="say-bubble" data-vo="hy_res04">두 사람 사이에 같은 장면이 두 번 반복돼요. 두 번째 장면에서 누가 먼저 손을 내미느냐에 따라<span class="cut">…</span>' + LOCK_I + '</div></div>';
    var locked = '<div class="locked-wrap">' + L.map(function (l, i) {
      var card = i === 1 ? '<div class="unlock-card"><div class="lock-ic">' + LOCK_SVG + '</div><b style="font-family:var(--f-display);font-size:17px">봉인된 7개 장이 남아 있어요</b><p>기질 비교, 끌림과 부딪힘, 관계의 흐름, 2027년, 그리고 고른 질문에 대한 답까지</p><span class="price">' + PR().price + '</span><button class="btn" type="button" data-unlock style="width:100%">봉인 풀기</button></div>' : '';
      if (l[0] === 10) card += teaseC;
      return card + '<div class="locked-sec"><div class="r-sec-head"><h3>' + l[1] + '</h3><span class="badge lock">' + LOCK_SVG + String(l[0]).padStart(2, "0") + '</span></div><p class="first' + (l[0] === 4 ? ' tease-line' : '') + '"' + (l[0] === 10 ? ' data-vo="hy_res05"' : '') + '>' + l[2] + '</p><div class="blur" aria-hidden="true">' + l[3] + '</div></div>';
    }).join("") + '</div>';
    var closing = '<section class="r-sec" style="border-top:0"><div class="r-sec-head"><h2>마무리 편지</h2><span class="no">11</span></div>' +
      '<div class="talk"><div class="ava">' + dali() + '</div><div class="say-bubble" data-vo="hy_res06">궁합은 점수가 아니라 두 사람이 서로를 대하는 방식이에요. 실을 묶는 것도, 푸는 것도 결국 두 사람 손이에요.</div></div>' +
      '<div class="disclaimer"><b>안내</b>이 풀이는 참고용이에요. 특정 결과를 보장하지 않으며, 관계의 중요한 결정은 두 사람의 대화로 정해 주세요. 마음이 많이 힘들 땐 자살예방상담전화 109(24시간)에서 이야기를 들어 줘요.</div></section><div style="height:120px"></div>';
    document.getElementById("resultBody").innerHTML = free + locked + closing;
    voWatch(document.getElementById("resultBody"));
    document.querySelectorAll("[data-unlock]").forEach(function (b) { b.addEventListener("click", openSheet); });
    requestAnimationFrame(function () { setTimeout(function () { document.querySelectorAll(".bar .fill").forEach(function (f) { f.style.width = f.dataset.w + "%"; }); }, 120); });
  }
  document.getElementById("unlockBtn").addEventListener("click", openSheet);

  /* ---------- 결제 시트 (흐름만 보여 줌) ---------- */
  function openSheet() {
    var back = document.createElement("div");
    back.className = "sheet-back";
    back.innerHTML = '<div class="sheet pad" role="dialog" aria-modal="true" aria-label="전체 풀이 열기"><div class="grab"></div>' +
      '<h2 style="font-size:19px">전체 풀이 열기</h2>' +
      '<div class="sheet-price"><span>' + PR().title + ' · 11개 장 · 웹 + PDF</span><b>' + PR().price + '</b></div>' +
      '<div class="agree"><label class="all"><input type="checkbox" id="ag-all"><span>아래 내용에 모두 동의해요</span></label>' +
      '<label><input type="checkbox" class="ag"><span>[필수] 이용약관에 동의해요</span></label>' +
      '<label><input type="checkbox" class="ag"><span>[필수] 개인정보 수집·이용(생년월일시, 이메일)에 동의해요</span></label>' +
      '<label><input type="checkbox" class="ag"><span>[필수] 디지털 콘텐츠라 풀이 제공이 시작되면 청약철회가 제한된다는 점을 확인했어요</span></label></div>' +
      '<button class="btn" type="button" id="payBtn" disabled>카카오로 로그인하고 결제하기</button>' +
      '<p class="sheet-msg" id="sheetMsg" hidden>샘플 화면이라 여기까지만 보여 드려요. 실제 사이트에서는 카카오 로그인, 토스 결제를 거쳐 나머지 장이 한 장씩 채워져요.</p>' +
      '<button class="skip" type="button" id="closeSheet">닫기</button></div>';
    document.body.appendChild(back);
    var all = back.querySelector("#ag-all"), ags = back.querySelectorAll(".ag"), pay = back.querySelector("#payBtn");
    function sync() { var ok = Array.prototype.every.call(ags, function (a) { return a.checked; }); all.checked = ok; pay.disabled = !ok; }
    all.addEventListener("change", function () { ags.forEach(function (a) { a.checked = all.checked; }); sync(); });
    ags.forEach(function (a) { a.addEventListener("change", sync); });
    pay.addEventListener("click", function () { back.querySelector("#sheetMsg").hidden = false; });
    function close() { back.remove(); document.removeEventListener("keydown", onKey); }
    function onKey(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);
    back.querySelector("#closeSheet").addEventListener("click", close);
    back.addEventListener("click", function (e) { if (e.target === back) close(); });
  }

  /* ---------- 사이트: 상품 목록, 메뉴, 탭 ---------- */
  var PRODUCTS = [
    { id: "newyear", cat: "newyear", title: "2027 신년운세", sub: "정미년 열두 달, 봉인해 둔 편지를 연지가 열어 드려요", price: "29,900원", img: "/media/n-letters.jpg", tag: "연지", live: true },
    { id: "love", cat: "love", title: "연애사주", sub: "언제, 어떤 얼굴의 인연이 오는지 한결이 짚어 드려요", price: "29,900원", img: "/media/s-thread.jpg", tag: "한결", live: true },
    { id: "fact", cat: "fact", title: "팩폭사주", sub: "듣기 싫어도 맞는 말, 내 사주가 숨겨 온 진짜 모습", glyph: "直" },
    { id: "reunion", cat: "reunion", title: "재회사주", sub: "끊어진 줄 알았던 인연, 다시 이어질 결이 남았는지", glyph: "緣" },
    { id: "match", cat: "match", title: "궁합사주", sub: "두 사람 사이의 실, 어디서 이어지고 어디서 엇갈리는지", price: "34,900원", img: "/media/m-hold.jpg", tag: "홍연", live: true },
    { id: "life", cat: "life", title: "인생사주", sub: "타고난 인생의 지도와 10년마다 바뀌는 대운의 물길", price: "44,900원", img: "/media/l-map.jpg", tag: "백운 선생", live: true }
  ];
  var IMG_SITE = { "/media/s-thread.jpg": "/media/s-thread.jpg", "/media/n-letters.jpg": IMG["/media/n-letters.jpg"], "/media/l-map.jpg": IMG["/media/l-map.jpg"], "/media/m-hold.jpg": IMG["/media/m-hold.jpg"] };
  var toastT = null;
  function toast(t) { var el = document.getElementById("toast"); el.textContent = t; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { el.hidden = true; }, 1900); }
  function renderCards(cat) {
    var list = PRODUCTS.filter(function (p) { return cat === "all" || p.cat === cat; });
    document.getElementById("cards").innerHTML = list.map(function (p) {
      var thumb = p.live ? '<img src="' + IMG_SITE[p.img] + '" alt="">' : '<span class="glyph-big">' + p.glyph + '</span>';
      return '<button type="button" class="pcard' + (p.live ? " wide" : " soon") + '" data-prod="' + p.id + '">' +
        '<span class="thumb">' + thumb + '<span class="tag">' + (p.live ? p.tag : "준비 중") + '</span></span>' +
        '<span class="txt"><b>' + p.title + '</b><span class="sub">' + p.sub + '</span>' + (p.live ? '' : '<span class="price">' + "곧 열려요" + '</span>') + '</span></button>';
    }).join("");
    document.querySelectorAll("[data-prod]").forEach(function (b) { b.addEventListener("click", function () { openProduct(b.dataset.prod); }); });
  }
  function openProduct(id) { if (PRODS[id]) go(id); else toast("준비 중인 풀이예요. 곧 열릴 거예요."); }
  document.querySelectorAll("[data-cat]").forEach(function (b) { b.addEventListener("click", function () {
    document.querySelectorAll("[data-cat]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); renderCards(b.dataset.cat);
  }); });
  document.querySelectorAll("[data-src2]").forEach(function (im) { im.src = IMG_SITE[im.dataset.src2]; });
  renderCards("all");
  document.getElementById("drawerProducts").innerHTML = PRODUCTS.map(function (p) {
    return '<li><button type="button" data-dprod="' + p.id + '">' + p.title + (p.live ? "" : "<span>준비 중</span>") + '</button></li>'; }).join("");
  var drawer = document.getElementById("drawer");
  function closeDrawer() { drawer.hidden = true; }
  document.querySelectorAll("[data-menu]").forEach(function (b) { b.addEventListener("click", function () { drawer.hidden = false; }); });
  document.getElementById("drawerClose").addEventListener("click", closeDrawer);
  drawer.addEventListener("click", function (e) { if (e.target === drawer) closeDrawer(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !drawer.hidden) closeDrawer(); });
  drawer.querySelectorAll("[data-dprod]").forEach(function (b) { b.addEventListener("click", function () { closeDrawer(); openProduct(b.dataset.dprod); }); });
  drawer.querySelectorAll("[data-nav]").forEach(function (b) { b.addEventListener("click", function () { closeDrawer(); go(b.dataset.nav); }); });
  document.querySelectorAll("[data-tab]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.tab); }); });
  function soonToast() { toast("샘플 화면이라 아직 연결되지 않았어요."); }
  document.querySelectorAll("[data-soon]").forEach(function (b) { b.addEventListener("click", soonToast); });

  var TODAY_EL = ["새로 시작하는 일에 힘이 실리는 날이에요. 미뤄 둔 연락 하나를 먼저 해 보세요.", "표현할수록 좋아지는 날이에요. 마음에 있는 말을 조금 더 꺼내 보세요.", "서두르기보다 다지는 날이에요. 익숙한 사람과의 시간이 편안함을 줘요.", "정리하고 매듭짓기 좋은 날이에요. 애매했던 일에 선을 그어 보세요.", "흐름에 몸을 맡기기 좋은 날이에요. 쉬어 가는 것도 운을 아끼는 방법이에요."];
  function renderToday() {
    var t = new Date(), P = calcPillars(t.getFullYear(), t.getMonth() + 1, t.getDate(), null), el = ST_EL[P.day[0]];
    document.getElementById("todayBody").innerHTML = '<div class="tab-pad">' +
      '<div class="t-card"><span class="t-date">' + t.getFullYear() + "년 " + (t.getMonth() + 1) + "월 " + t.getDate() + "일 · " + ST_KO[P.year[0]] + BR_KO[P.year[1]] + "년 " + ST_KO[P.month[0]] + BR_KO[P.month[1]] + '월</span>' +
      '<div class="t-ilji">' + ST[P.day[0]] + BR[P.day[1]] + '일<small>' + ST_KO[P.day[0]] + BR_KO[P.day[1]] + '일 · ' + EL_NM[el] + '의 기운</small></div>' +
      '<p style="margin:0;color:var(--ink-soft)">' + TODAY_EL[el] + '</p></div>' +
      '<div class="t-card"><b style="font-family:var(--f-display);font-size:17px">내 사주로 본 오늘</b>' +
      '<div class="t-lock"><p>오늘 그대의 일간과 일진이 만나 관계의 흐름이 부드럽게 열립니다. 오후에는 반가운 연락이 있을 수 있어요.</p><span>로그인하면 내 사주로 볼 수 있어요</span></div>' +
      '<button class="kakao" type="button" data-soon2>카카오로 계속하기</button></div></div>';
    document.querySelectorAll("[data-soon2]").forEach(function (b) { b.addEventListener("click", soonToast); });
  }
  function renderBox() {
    var sv = loadSaved(), body = document.getElementById("boxBody");
    if (sv && sv.birth) {
      body.innerHTML = '<div class="tab-pad"><button class="rep" type="button" data-go2="result"><img src="' + IMG_SITE[(PRODS[sv.prod] || PRODS.love).thumb] + '" alt=""><span><b>' + esc(sv.name) + '님의 ' + (PRODS[sv.prod] || PRODS.love).title + '</b><span>무료 미리보기 · 1~3장 열림 · 7개 장 잠김</span></span></button>' +
        '<p class="note">로그인하면 다른 기기에서도 리포트를 볼 수 있어요.</p></div>';
    } else {
      body.innerHTML = '<div class="empty"><b>아직 받은 풀이가 없어요</b><span>풀이를 받으면 여기에 차곡차곡 모여요.</span><button class="btn" type="button" data-go2="love">연애사주 보러 가기</button></div>';
    }
    body.querySelectorAll("[data-go2]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.go2); }); });
  }

  /* ---------- 화면 전환 ---------- */
  var VIEWS = ["home", "intro", "form", "result", "today", "box", "me"], TABS = ["home", "today", "box", "me"];
  function show(v) {
    if (PRODS[v]) { applyProduct(v); v = "intro"; }
    if (v !== "intro") bgmStop();
    if (v === "intro" && !ORIG.film) applyProduct("love");
    if (VIEWS.indexOf(v) < 0) v = "home";
    VIEWS.forEach(function (x) { document.getElementById("v-" + x).hidden = x !== v; });
    var tb = document.getElementById("tabbar"); tb.hidden = TABS.indexOf(v) < 0;
    tb.querySelectorAll("[data-tab]").forEach(function (b) { if (b.dataset.tab === v) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    drawer.querySelectorAll("[data-dprod]").forEach(function (b) { b.classList.toggle("cur", v === "intro" && b.dataset.dprod === CUR); });
    if (v === "today") renderToday();
    if (v === "box") renderBox();
    window.scrollTo(0, 0);
    cancelAnimationFrame(skyRAF); clearTimeout(typeTimer); clearTimers();
    if (v === "intro") { startSky(); runHeroBubble(); setupScenes(); setupFilm(); setupStory(); setupFlow(); if (!qBody.innerHTML) qGo(0); }
    if (v === "form") startForm(true);
    if (v === "result") { var s = (state && state.birth) ? state : (loadSaved() || SAMPLE); renderResult(s); }
  }
  function go(v) { if (v === "intro") v = CUR; if (location.hash === "#" + v) show(v); else location.hash = v; }
  document.querySelectorAll("[data-go]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.go); }); });
  window.addEventListener("hashchange", function () { show(location.hash.slice(1)); });
  show(location.hash.slice(1));
})();
