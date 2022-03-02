var Links = {
    setColor: function (color) {
        let alist = document.querySelectorAll('a');
        let i = 0;
        while (i < alist.length) {
            alist[i].style.color = color;
            i = i + 1;
        }
    }
}
var Body = {
    setColor: function (color) {
        document.querySelector('body').style.color = color;
    },
    setBackColor: function (color) {
        document.querySelector('body').style.backgroundColor = color;
    }
}

function nightDayHandler(self) {
    if (self.value == 'night') {
        Body.setBackColor('black');
        Body.setColor('white');
        Links.setColor('powderblue');
        self.value = 'day';
    } else {
        Body.setBackColor('white');
        Body.setColor('black');
        Links.setColor('blue');
        self.value = 'night';
    }
}
