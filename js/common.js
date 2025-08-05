// 전역 변수
let windowHeight = $(window).outerHeight();
let windowWidth = $(window).outerWidth();
const headerEl = $('#header');
let st = window.scrollY;
let isScrollDown = false;

// 윈도우 가로 사이즈 변경시 세팅 초기화
window.addEventListener('resize', function () {
    if (windowWidth !== window.innerWidth) {
        initRootBase();
    }
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
});

// 모바일에서 브라우저 높이 변경을 대비해 높이 기준값을 고정값으로 설정
// 해당 설정이 없을 경우 카카오톡 브라우저나 모바일 사파리에서 페럴렉스 부분 레이아웃이 튀는 현상이 발생합니다.
function initRootBase() {
    // 높이 기준 설정
    const baseHeightEl = document.createElement('div');
    baseHeightEl.style.height = '100vh';
    baseHeightEl.style.position = 'absolute';
    baseHeightEl.style.top = '0';
    baseHeightEl.style.left = '0';
    document.body.appendChild(baseHeightEl);

    const bh = baseHeightEl.offsetHeight;
    document.body.removeChild(baseHeightEl);
    document.documentElement.style.setProperty('--base-height', bh + 'px');

    // 엘리먼트
    const baseHaeder = $('.header');
    const baseMenuBar = $('.menu-bar');
    const basePageTab = $('.page-tab');
    const baseDataHead = $('.data-head');
    const baseFixedBtn = $('.fixed-btn');
    const baseLayerFixedBtn = $('.layer-page__fixed-btn');

    // 높이 설정
    const hh = baseHaeder.outerHeight();
    document.documentElement.style.setProperty('--header-height', hh + 'px');

    if (baseMenuBar.length > 0) {
        const rectREsult = baseMenuBar.outerHeight();
        document.documentElement.style.setProperty(
            '--menubar-height',
            rectREsult + 'px'
        );
    }

    if (basePageTab.length > 0) {
        const rectREsult = basePageTab.outerHeight();
        document.documentElement.style.setProperty(
            '--pagetab-height',
            rectREsult + 'px'
        );
    }

    if (baseDataHead.length > 0) {
        const rectREsult = baseDataHead.outerHeight();
        document.documentElement.style.setProperty(
            '--datahead-height',
            rectREsult + 'px'
        );
    }

    if (baseFixedBtn.length > 0) {
        const rectREsult = baseFixedBtn.outerHeight();
        document.documentElement.style.setProperty(
            '--fixedbtn-height',
            rectREsult + 'px'
        );
    }

    if (baseLayerFixedBtn.length > 0) {
        const rectREsult = baseLayerFixedBtn.outerHeight();
        document.documentElement.style.setProperty(
            '--layerFixedbtn-height',
            rectREsult + 'px'
        );
    }
}
initRootBase();

// 공통 탭
$(document).on('click', '.tab_wrap .tab_btns button', function () {
    const thisTabWrap = $(this).closest('.tab_wrap');
    const thisTab = $(this).data().tab;

    thisTabWrap.find('.tab_btns button').each(function () {
        $(this).removeClass('current');
    });

    thisTabWrap.find('.tab_conts > div').each(function () {
        $(this).removeClass('current');
    });

    $(this).addClass('current');
    thisTabWrap.find('.tab0' + thisTab).addClass('current');
});

$(document).on('click', '.haeder__menu-btn', function () {
    const isOpen = headerEl.hasClass('open');
    if (isOpen) {
        headerEl.removeClass('open');
    } else {
        headerEl.addClass('open');
    }
});

let mainSliderLength = $('.main-slide-banner__item').length;
var mainSlider = new Swiper(
    '.main-slide-banner__slider .main-slide-banner__slider-wrap',
    {
        slidesPerView: 'auto',
        loop: true,
        slideActiveClass: 'active',
        slideDuplicateActiveClass: 'du_active',
        slidePrevClass: 'prev',
        slideNextClass: 'next',
        slideDuplicatePrevClass: 'prev',
        slideDuplicateNextClass: 'next',
        centeredSlides: true,
        observeParents: true,
        observer: true,
        speed: 600,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        // 터치 방지
        simulateTouch: true,
        allowTouchMove: true,
        hashNavigation: false,
        // 기능
        on: {
            slideChange: function () {
                $('.main-slide-banner__slider .fraction__total').text(
                    mainSliderLength
                );
                $('.main-slide-banner__slider .fraction__current').text(
                    this.realIndex + 1
                );
            },
        },
    }
);

// 글자수에 따라 폰트 사이즈 조정
function fontSz() {
    $('.order-product-title').each(function () {
        const textOnly = $(this)
            .clone()
            .children()
            .remove()
            .end()
            .text()
            .trim();
        if (textOnly.length > 10) {
            $(this).css('font-size', '14px');
        }
    });
}

fontSz();

var mainBannerSlider = new Swiper(
    '.main-banner-slider .main-banner-slider-wrap',
    {
        slidesPerView: 'auto',
        loop: true,
        slideActiveClass: 'active',
        slideDuplicateActiveClass: 'du_active',
        slidePrevClass: 'prev',
        slideNextClass: 'next',
        slideDuplicatePrevClass: 'prev',
        slideDuplicateNextClass: 'next',
        centeredSlides: true,
        observeParents: true,
        observer: true,
        speed: 600,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        // 불릿
        pagination: {
            el: '.main-banner-slider .dots',
            type: 'bullets',
            bulletActiveClass: 'current',
            clickable: true,
        },
    }
);

$(document).on('click', '.modal-slide__link', function () {
    const thisWrap = $(this).closest('.modal-slide__list');
    const nthEl = thisWrap.find('.modal-slide__link');
    $(nthEl).removeClass('current');
    $(this).addClass('current');

    const thisData = $(this).data();

    if (thisData.depth) {
        // depth 데이터로 다음 뎁스 데이터 가져오기
        const currentDepth = thisData.depth;

        // 다음 카테고리 데이터 받아서 처리
        // nextDepth 더미 데이터는 main.html 파일 하단에 있습니다.
        // nextDepth에 데이터가 있으면 모달 생성 or 없으면 링크 이동
        if (nextDepth) {
            // 비동기로 작업하실 경우 타이머 삭제
            // 체크 애니메이션 필요 없어도 타이머 삭제
            setTimeout(() => {
                const thisModal = $(this).closest('.modal-slide');
                removeModal(thisModal);
                setCateModalList('주류마켓', nextDepth);

                // *데모* 배열 null 처리로 페이지 이동 예시 구현
                nextDepth = null;
            }, 100);
        } else {
            // *데모* url path 구조에 맞춰 넣어주세요.
            window.location.href = './product-list.html';
        }
    }
});

// 슬라이드 모달 생성
function setCateModalList(title, listArray, modify) {
    const modalEl =
        '<div class="modal-slide open">' +
        '<div class="modal-slide__cont">' +
        '<h2 class="modal-slide__title">' +
        title +
        '</h2>' +
        '<button type="button" class="modal-slide__btn-slide" title="모달 닫기"></button>' +
        '<div class="modal-slide__list-wrap">' +
        '<ul class="modal-slide__list"></ul>' +
        '</div>' +
        '</div>' +
        '</div>';

    const vDom = new DOMParser();
    const modalDoc = vDom.parseFromString(modalEl, 'text/html');
    const vList = $(modalDoc).find('.modal-slide__list');

    $(listArray).each(function (item) {
        // const el = this.depth
        //     ? '<li class="modal-slide__item"><button type="button" class="modal-slide__link" data-depth="' + this.depth + '" data-cate-id="' + this.id + '">' + this.name + "</button></li>"
        //     : '<li class="modal-slide__item ' + modify + '"><button type="button" class="modal-slide__link">' + this.name + "</button></li>";
        // vList.append(el);
        const createBtn = $(
            '<button type="button" class="modal-slide__link">' +
                this.name +
                '</button>'
        );

        // item 객체의 depth 속성이 있는 경우 data-depth 속성 추가
        if (this.depth) {
            createBtn.attr('data-depth', this.depth);
        }

        // item 객체의 id 속성이 있는 경우 data-cate-id 속성 추가
        if (this.id) {
            createBtn.attr('data-cate-id', this.id);
        }

        if (this.class) {
            createBtn.addClass(this.class);
        }

        if (this.checked) {
            createBtn.addClass('current');
        }

        const $li = $('<li class="modal-slide__item"></li>');

        $li.append(createBtn);
        vList.append($li);
    });
    const resultDom = $(modalDoc).find('.modal-slide');
    $('#container').append(resultDom);
}

// 슬라이드 모달 삭제
function removeModal(targetEl) {
    $('.modal-slide').removeClass('open');
    setTimeout(() => {
        targetEl.remove();
    }, 600);
}

// 슬라이드 모달 닫기
$(document).on('click', '.modal-slide__btn-slide', function () {
    const thisModal = $(this).closest('.modal-slide');
    removeModal(thisModal);
});

// 외부 클릭 닫기
$(document).on('click', function (e) {
    if (
        $(e.target).closest('.bottle-cate__item, .modal-slide__cont').length ==
        0
    ) {
        if ($(e.target).hasClass('modal-slide')) {
            removeModal($(e.target));
        }
    }
});

// 레이어 페이지 열기
$(document).on('click', '.data-head__sort-item', function () {
    const sortWrap = $(this).closest('.data-head__sort');
    const sortNth = sortWrap.find('.data-head__sort-item');
    sortNth.removeClass('current');
    $(this).addClass('current');
});

// 레이어 페이지 닫기
$(document).on('click', '.layer-header__btn-close', function () {
    $('.layer-page').removeClass('open');
});

// 초성 필터 된소리
$(document).on('click', '.btn-letter-shift', function () {
    const thisFilter = $(this).closest('.letter-filter__list');
    const thisNth = thisFilter.find('.btn-letter-input');
    const isShift = $(this).hasClass('active');

    if (isShift) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }

    thisNth.each(function () {
        const thisData = $(this).data();
        const thisOrigin = thisData.letterOrigin;
        const thisShift = thisData.letterShift;
        const resultLetter = isShift ? thisOrigin : thisShift;
        $(this).text(resultLetter);
    });
});

// 공통 셀렉트 박스
let currentSelect;
$(document).on('click', '.open-select__btn', function () {
    const thisWrap = $(this).closest('.open-select');
    const thisList = thisWrap.find('.open-select__list');
    const thisItem = $(thisList).find('option');
    const thisLabelOption = $(thisWrap.find('option'));
    const thisTitle = $(thisLabelOption[0]).text();
    let listData = [];

    thisItem.each(function () {
        if (!$(this).val()) {
            return;
        }
        const value = $(this).text();
        listData.push({
            name: value,
            checked: $(this).is(':selected'),
            class: 'btn-sort',
        });
    });
    setCateModalList(thisTitle, listData);
    currentSelect = thisList;
});

$(document).on('click', '.btn-sort', function () {
    const thisValue = $(this).text();
    const thisLabel = $(currentSelect.closest('.open-select')).find(
        '.open-select__btn'
    );
    thisLabel.text(thisValue);
    const thisItem = $(currentSelect).find(`option[value='${thisValue}']`);
    $(thisItem).prop('selected', true);
    const thisModal = $(this).closest('.modal-slide');
    setTimeout(() => {
        removeModal(thisModal);
    }, 100);
});

$(document).on('click', '.search-filter__btn', function () {
    const thisWrap = $(this).closest('.search-filter__row');
    const thisNth = thisWrap.find('.search-filter__btn');

    $(thisNth).removeClass('current');
    $(this).addClass('current');
});

// 모달 알럿 닫기
$(document).on('click', '.modal-alert__btn', function () {
    $('.modal-alert').removeClass('open');
});

$(document).on('click', '.btn-memo', function () {
    $('.memo-field').toggleClass('open');
});

var thumbSlider = new Swiper('.detail-thumb .detail-thumb__slider', {
    slidesPerView: 'auto',
    loop: true,
    slideActiveClass: 'active',
    slideDuplicateActiveClass: 'du_active',
    slidePrevClass: 'prev',
    slideNextClass: 'next',
    slideDuplicatePrevClass: 'prev',
    slideDuplicateNextClass: 'next',
    centeredSlides: true,
    observeParents: true,
    observer: true,
    speed: 600,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    // 불릿
    pagination: {
        el: '.detail-thumb .dots',
        type: 'bullets',
        bulletActiveClass: 'current',
    },
});

// 좋아요 누르기
$(document).on('click', '.btn-like', function () {
    $(this).toggleClass('like');
});

// 인기순 최신순
$(document).on('click', '.list-header__sort', function () {
    let currentText = $(this).text().trim();

    if (currentText === '최신순') {
        $(this).text('인기순');
    } else {
        $(this).text('최신순');
    }
});
