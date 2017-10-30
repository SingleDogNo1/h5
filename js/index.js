$(function () {
    var sound = $('#okobo')[0];
    var flag = false;
    var browser = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                weixin: u.indexOf('MicroMessenger') > -1,
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                iPad: u.indexOf('iPad') > -1,
                webApp: u.indexOf('Safari') == -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    setTimeout(function () {
        $('.swiper-slide').eq(0).find('.next').addClass('nextpage')
    }, 3000);
    $('.one .tag').each(function (i, v) {
        var baseDelayTime = 500;
        setTimeout(function () {
            $(v).addClass('animated bounceInLeft')
        }, i * baseDelayTime)
    });
    function share() {
        var timesta;
        var nonce_str;
        var sign;
        var url1 = window.location.href;
        var makeBoundary = function () {
            return '----WebKitFormBoundary' + btoa(Math.random().toString()).substr(0, 12);
        };
        var boundary = makeBoundary();
        $.ajax({
            method: 'post',
            type: "post",
            url: "http://api.h5.dpandora.cn/wx/signature",
            contentType: 'multipart/form-data; boundary=' + boundary,
            header: {
                "Authorization": '10-ccf7524f96e32d3dcb10846997c83b47'
            },
            processData: false,
            cache: false,
            data: '--' + boundary + '\r\n' +
            'Content-Disposition: form-data; name="url"\r\n\r\n' +
            url1 + '\r\n' +
            '--' + boundary + '--',
            success: function (data) {
                console.log(data)
                timesta = data.timestamp;
                nonce_str = data.noncestr;
                sign = data.signature;
                wx.config({
                    debug: false,
                    appId: 'wxdc85beef029bb0fb',
                    timestamp: timesta,
                    nonceStr: nonce_str,
                    signature: sign,
                    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
                });
                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        link: 'http://h5.dpandora.cn/index.html',
                        imgUrl: 'http://h5.dpandora.cn/images/credit-share-icon.png',
                        title: '老铁是不是真的铁，借次钱就知道了 ',
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    wx.onMenuShareAppMessage({
                        link: 'http://h5.dpandora.cn/index.html',
                        imgUrl: 'http://h5.dpandora.cn/images/credit-share-icon.png',
                        title: '老铁是不是真的铁，借次钱就知道了 ',
                        desc: '有胆你就来',
                        type: '',
                        dataUrl: '',
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    wx.onMenuShareQQ({
                        link: 'http://h5.dpandora.cn/index.html',
                        imgUrl: 'http://h5.dpandora.cn/images/credit-share-icon.png',
                        title: '老铁是不是真的铁，借次钱就知道了 ',
                        desc: '有胆你就来',
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    wx.onMenuShareWeibo({
                        link: 'http://h5.dpandora.cn/index.html',
                        imgUrl: 'http://h5.dpandora.cn/images/credit-share-icon.png',
                        title: '老铁是不是真的铁，借次钱就知道了 ',
                        desc: '有胆你就来',
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    wx.onMenuShareQZone({
                        link: 'http://h5.dpandora.cn/index.html',
                        imgUrl: 'http://h5.dpandora.cn/images/credit-share-icon.png',
                        title: '老铁是不是真的铁，借次钱就知道了 ',
                        desc: '有胆你就来',
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                });
            }
        });
    }

    if ((browser.versions.weixin)) {
        share()
    }
    new Swiper('.swiper-container', {
        direction: 'vertical',
        resistanceRatio: 0,
        lazyLoading: true,
        onTouchStart: function (swiper) {
            // todo  锁死向下滚动
            swiper.unlockSwipeToPrev();
            swiper.lockSwipeToNext();
            if (swiper.activeIndex === 0 || flag === true) {
                swiper.unlockSwipeToNext()
            }
            $('.nextpage').on('click', function () {
                var currentIndex = $(this).parent('.swiper-slide').index();
                swiper.unlockSwipeToNext();
                swiper.slideTo(currentIndex + 1)
            })
        },
        onSlideChangeEnd: function (swiper) {
            flag = false
        },
        onTransitionEnd: function (swiper) {
            var index = swiper.activeIndex;
            $('.swiper-slide').eq(index).find('.initword').addClass('active');
            setTimeout(function () {
                $('.swiper-slide').eq(index).find('.initword span').each(function (i, v) {
                    setTimeout(function () {
                        $(v).addClass('show')
                    }, 150 * (i + 1))
                })
            }, 300);
            if (index !== 4 && index !== 3) {
                setTimeout(function () {
                    $('.swiper-slide').eq(index).find('.button-wrapper').addClass('active');
                    $('.swiper-slide').eq(index).find('.button-wrapper .button').on('click', function () {
                        var $this = $(this).parent();
                        $(this).attr('disabled', 'disabled');
                        $this.removeClass('active');
                        var word2 = $this.siblings('.scene-1').find('.word-wrapper-2');
                        setTimeout(function () {
                            word2.addClass('active').find('span').each(function (i, v) {
                                setTimeout(function () {
                                    $(v).addClass('show')
                                }, 150 * (i + 1))
                            });
                        }, 300);
                        setTimeout(function () {
                            $this.siblings('.scene-2').removeClass('hide').addClass('animated fadeIn')
                        }, 4000);
                         setTimeout(function () {
                             $this.find('.button').animate({opacity: 0}, 300);
                             setTimeout(function () {
                                 $this.find('.msg-wrapper').animate({opacity: 1, zIndex: 99}, 300)
                             }, 600)
                         }, 5000);
                         setTimeout(function () {
                             $this.find('.msg-wrapper').animate({opacity: 0, zIndex: 0});
                             setTimeout(function () {
                                 $this.find('.fail-msg').animate({opacity: 1, zIndex: 99})
                             }, 1000)
                         }, 8000);
                         setTimeout(function () {
                             var scene3 = $this.siblings('.scene-3');
                             scene3.removeClass('hide').addClass('animated fadeIn');
                             setTimeout(function () {
                                 scene3.find('.logo').addClass('go');
                                 sound.play();
                                 setTimeout(function () {
                                     $this.parent().find('.nextpage').css({display: 'block'});
                                     flag = true
                                 }, 30)
                             }, 700)
                         }, 9000)
                    })
                }, 2000)
            }
            if (index === 1) {
                console.log('场景1');
            } else if (index === 2) {
                console.log('场景2');
                var foo = 0;
                var t = setInterval(function () {
                    foo++;
                    if (foo % 2 === 0) {
                        $('.three .scene-1 .star1').css({display: 'block'});
                        $('.three .scene-1 .star2').css({display: 'none'})
                    } else {
                        $('.three .scene-1 .star1').css({display: 'none'});
                        $('.three .scene-1 .star2').css({display: 'block'})
                    }
                }, 500);
                setTimeout(function () {
                    $('.three').find('.button-wrapper .button').on('click', function () {
                        var $this = $(this).parent();
                        setTimeout(function () {
                            $this.siblings('.scene-2').removeClass('hide').addClass('animated fadeIn');
                            clearInterval(t);
                            var bar = 0;
                            setInterval(function () {
                                bar++;
                                if (bar % 2 === 0) {
                                    $this.siblings('.scene-2').find('.heart').css({backgroundImage: 'url("images/heart-step2.png")'})
                                } else {
                                    $this.siblings('.scene-2').find('.heart').css({backgroundImage: 'url("images/heart-step3.png")'})
                                }
                            }, 300)
                        }, 3200)
                    })
                }, 1000)
            } else if (index === 3) {
                console.log('场景3');
                setTimeout(function () {
                    $('.swiper-slide').eq(index).find('.button-wrapper').addClass('active');
                    setTimeout(function () {
                        $('.swiper-slide').eq(index).find('.scene-1 .next').addClass('active');
                        $('.swiper-slide').eq(index).find('.scene-1 .next span').each(function (i, v) {
                            setTimeout(function () {
                                $(v).addClass('show')
                            }, 150 * (i + 1))
                        })
                    }, 100);
                    setTimeout(function () {
                        setTimeout(function () {
                            $('.four .button-wrapper .button').on('click', function () {
                                var $this = $(this).parent();
                                $(this).attr('disabled', 'disabled');
                                $this.removeClass('active');
                                var word2 = $this.siblings('.scene-1').find('.word-wrapper-2');
                                setTimeout(function () {
                                    word2.addClass('active').find('span').each(function (i, v) {
                                        setTimeout(function () {
                                            $(v).addClass('show')
                                        }, 150 * (i + 1))
                                    });
                                }, 300);
                                $this.siblings('.scene-1').find('.left').css({display: 'none'});
                                $this.siblings('.scene-1').find('.right').addClass('remove');
                                setTimeout(function () {
                                    $this.siblings('.scene-2').removeClass('hide').addClass('animated fadeIn')
                                }, 4000);
                                setTimeout(function () {
                                    $this.siblings('.scene-2').find('.cup').addClass('rotate');
                                    setTimeout(function () {
                                        $this.siblings('.scene-2').find('.water').animate({opacity: 1}, 400);
                                    }, 1400)
                                }, 5000);
                                 setTimeout(function () {
                                     $this.find('.button').animate({opacity: 0}, 300);
                                     setTimeout(function () {
                                         $this.find('.msg-wrapper').animate({opacity: 1, zIndex: 99}, 300)
                                     }, 600)
                                 }, 5000);
                                 setTimeout(function () {
                                     $this.find('.msg-wrapper').animate({opacity: 0, zIndex: 0});
                                     setTimeout(function () {
                                         $this.find('.fail-msg').animate({opacity: 1, zIndex: 99})
                                     }, 1000)
                                 }, 8000);
                                 setTimeout(function () {
                                     var scene3 = $this.siblings('.scene-3');
                                     scene3.removeClass('hide').addClass('animated fadeIn');
                                     setTimeout(function () {
                                         scene3.find('.logo').addClass('go');
                                         sound.play();
                                         setTimeout(function () {
                                             $this.parent().find('.nextpage').css({display: 'block'});
                                             flag = true
                                         }, 30)
                                     }, 700)
                                 }, 9000)
                            })
                        }, 1000)
                    }, 0);
                },2000)


            } else if (index === 4) {
                console.log('场景4');
                setTimeout(function () {
                    $('.swiper-slide').eq(index).find('.scene-1 .next').addClass('active');
                    setTimeout(function () {
                        $('.swiper-slide').eq(index).find('.scene-1 .next span').each(function (i, v) {
                            setTimeout(function () {
                                $(v).addClass('show')
                            }, 150 * (i + 1))
                        })
                    }, 300);
                }, 1200);
                setTimeout(function () {
                    $('.swiper-slide').eq(index).find('.button-wrapper').addClass('active');
                    $('.swiper-slide').eq(index).find('.button-wrapper .button').on('click', function () {
                        $(this).attr('disabled', 'disabled');
                        var $this = $(this).parent();
                        $this.removeClass('active');
                        setTimeout(function () {
                            $this.siblings('.scene-2').removeClass('hide').addClass('animated fadeIn');
                            setTimeout(function () {
                                $this.siblings('.scene-2').find('.init').addClass('active');
                                $this.siblings('.scene-2').find('.init span').each(function (i, v) {
                                    setTimeout(function () {
                                        $(v).addClass('active')
                                    }, 150 * (i + 1))
                                })
                            }, 500)
                        }, 1000);
                        setTimeout(function () {
                            $this.siblings('.scene-2').find('.next').addClass('active');
                            $this.siblings('.scene-2').find('.next span').each(function (i, v) {
                                setTimeout(function () {
                                    $(v).addClass('active')
                                }, 150 * (i + 1))
                            })
                        }, 3500);
                        setTimeout(function () {
                            $this.find('.button').animate({opacity: 0});
                            setTimeout(function () {
                                $this.find('.msg-wrapper').animate({opacity: 1, zIndex: 99})
                            }, 500)
                        }, 6000);
                        setTimeout(function () {
                            $this.find('.msg-wrapper').animate({opacity: 0, zIndex: 0});
                            setTimeout(function () {
                                $this.find('.fail-msg').animate({opacity: 1, zIndex: 99})
                            }, 1000)
                        }, 9000);
                        setTimeout(function () {
                            var scene3 = $this.siblings('.scene-3');
                            scene3.removeClass('hide').addClass('animated fadeIn');
                            setTimeout(function () {
                                scene3.find('.logo').addClass('go');
                                sound.play();
                                setTimeout(function () {
                                    $this.parent().find('.nextpage').css({display: 'block'});
                                    flag = true
                                }, 30)
                            }, 700);
                        }, 10000);
                    })
                }, 1800);
            } else if (index === 5) {
                $('.six .floor').each(function (i, v) {
                    var baseDelayTime = 500;
                    setTimeout(function () {
                        $(v).addClass('animated bounceInUp')
                    }, i * baseDelayTime)
                });
                if ((browser.versions.weixin)) {
                    var isShare = false;
                    $('.six .wilful').on('click', function () {
                        isShare = true;
                        $('.dir_wrap').css('display', 'block');
                        $('.dir_wrap').animate({opacity: 0.9}, 400);
                    });
                    setTimeout(function () {
                        if (isShare === false) {
                            $('.dir_wrap').css('display', 'block');
                            $('.dir_wrap').animate({opacity: 0.9}, 400);
                        }
                    }, 6000);
                    $('.dir_wrap').click(function () {
                        $('.dir_wrap').animate({"opacity": 0}, 400);
                        setTimeout(function () {
                            $('.dir_wrap').hide()
                        }, 400)
                    })
                }
            }
        }
    })
});
