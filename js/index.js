//$(document).ready(function(){  
//(function($) {          
//    $(document).ready(function(){                    
//        $(window).scroll(function(){                          
//            if ($(this).scrollTop() > 200) {
//                $('.navbar').fadeIn(500);
//            } else {
//                $('.navbar').fadeOut(500);
//            }
//        });
//    });
//})(jQuery);
//
//$(window).scroll(
//    {
//        previousTop: 0
//    }, 
//    function () {
//    var currentTop = $(window).scrollTop();
//    if (currentTop < this.previousTop) {
////        $(".sidebar em").text("Up");
//        $(".navbar").fadeIn(1000).show();
//    } else {
////        $(".sidebar em").text("Down");
//        $(".navbar").hide();
//    } 
//    this.previousTop = currentTop;
//});

//Email Configuration
(function () {
    emailjs.init({
        publicKey: "0Ar5kf48yvUMJ3ACH",
    });
})();

if ($(window).width() > 769) {
    var mywindow = $(window);
    //    console.log(mywindow);
    var mypos = mywindow.scrollTop();
    var up = false;
    var newscroll;
    mywindow.scroll(function () {
        newscroll = mywindow.scrollTop();
        if (newscroll > mypos && !up) {
            $('.navbar').fadeOut(800);
            //        $('.bottom-navbar').fadeOut(800);
            up = !up;
            console.log(up);
        } else if (newscroll < mypos && up) {
            $('.navbar').stop().fadeIn(400);
            //        $('.bottom-navbar').stop().fadeIn(400);
            up = !up;
        }
        mypos = newscroll;
    });
}
$('.nav-link').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $('.nav-link').each(function () {
        $(this).removeClass('active');
    })
    $(this).addClass('active');
    var myScrollPos = $('.nav-link.active').offset().left + $('.nav-link.active').outerWidth(true) / 2 + $('.navbar-2').scrollLeft() - $('.navbar-2').width() / 2;
    $('.navbar-2').scrollLeft(myScrollPos);
});

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 0;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
//});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Get the form data
    const mobilePattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const name = document.getElementById('fullname')?.value;
    const email = document.getElementById('email')?.value;
    const mobile = document.getElementById('mobile')?.value;
    const message = document.getElementById('message')?.value;
    const mobileError = document.getElementById('mobile-error');

    if (mobile && !mobile.match(mobilePattern)?.length) {
        mobileError.style.display = 'block';
        mobileError.style.color = '#f4ff07';
        return;
    } else {
        mobileError.style.display = 'none';
    }


    const templateParams = {
        from_name: name,
        to_name: "Pradhumna Malakar",
        message: {
            email: email,
            mobile: mobile,
            message: message,
        },
    };

    emailjs.send('service_apraw4q', 'template_3pjkyy9', templateParams, '0Ar5kf48yvUMJ3ACH')
        .then(function (response) {
            console.log('response', response);
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset();
        }, function (error) {
            alert('Failed to send message. Please try again.');
        });
});



