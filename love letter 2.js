$(document).ready(function () {
  var envelope = $("#envelope");
  var wrapper = $(".envlope-wrapper");
  var letter = envelope.find(".letter");
  var letterContent = envelope.find(".letter-content");
  var btn_open = $("#open");
  var btn_reset = $("#reset");

  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    var contentHeight = letterContent.outerHeight(true);
    var lift = contentHeight + 40;

    letter.css({
      height: contentHeight + "px",
      transform: "translateY(-" + lift + "px)"
    });

    wrapper.css("margin-top", lift + 40 + "px");

    envelope.addClass("open").removeClass("close");

    setTimeout(function () {
      letter[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }, 700);

    // fade the hearts out after 3 seconds
    setTimeout(function () {
      envelope.find(".heart").addClass("fade-out");
    }, 3000);
  }

  function close() {
    letter.css({
      height: "",
      transform: "translateY(0px)"
    });

    wrapper.css("margin-top", "");

    envelope.find(".heart").removeClass("fade-out");

    envelope.addClass("close").removeClass("open");
  }
});