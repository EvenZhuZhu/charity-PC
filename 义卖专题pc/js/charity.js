/**
 * Created by 前端-张瑞康 on 2017/12/21.
 */
$(function () {
  
  //页面一加载金额跳转动画
  $(document).ready(function () {
    $(".cub").addClass("active");
  });
  
  //aja获取全部数据
  $.ajax({
    type: "get",
    url: "/charity/list",
    dataType: "json",
    success: function (data) {
      $(".block").css("display","none");
      //当前筹款金额渲染
      var fundStr = (data.result.fund).toString();
      var fundArr = fundStr.split("").reverse();
      for (var i = fundArr.length; i < 7; i++) {
        fundArr.push(0);
      }
      
      $(".cub7 .one7").html(fundArr[0]);
      $(".cub6 .one6").html(fundArr[1]);
      $(".cub5 .one5").html(fundArr[2]);
      $(".cub4 .one4").html(fundArr[3]);
      $(".cub3 .one3").html(fundArr[4]);
      $(".cub2 .one2").html(fundArr[5]);
      $(".cub1 .one1").html(fundArr[6]);

      //最新公告数据渲染
      var newsArr = data.result.news;
      for (var i = 0; i < newsArr.length; i++) {
        $('.news-carousel').append("<li>" + newsArr[i] + "</li>");
      }

      // 最新公告轮播效果
      $lis = $(".news-carousel li");
      $(".news-carousel").append($lis[0].cloneNode(true));
      var index = 0;
      var timer = null;
      timer = setInterval(function () {
        $(".news-carousel").on("transitionend", function () {
          if (index >= $lis.length) {
            index = 0;
            $(".news-carousel").css("transition", "none");
            $(".news-carousel").css("transform", "translateY(" + 0);
          }
        })
        index++;
        $(".news-carousel").css("transition", "transform .5s");
        $(".news-carousel").css("transform", "translateY(" + (-index * $lis[0].offsetHeight) + "px)")
      }, 1000);
      
      
      //商品列表分页
      var MaxPageCount = Math.ceil(data.result.pages.count / data.result.pages.page_size);
      var str = "";
      for (var i = 1; i <= MaxPageCount; i++) {
        str = str + "<span class='num'>" + i + "</span>";
      }
      $("#prev").after(str);
      
      
      // 商品列表数据渲染
      $(".sale .page span").eq(1).css("background-color","#d72614").siblings().css("background-color","#fff");
      $(".sale .page span").eq(1).css("color","#fff").siblings().css("color","#a6a6a6");
      $(".sale .page span").on("mouseover",function () {
          $(this).css({
            "border-color":"#d72614",
            "cursor":"pointer"
         }).siblings().css({
            "border-color":"#ededed",
          })
      })
      $(".sale .page span").on("mouseout",function () {
        $(".sale .page span").css({
          "border-color":"#ededed",
        })
      })
      
      var strs = '';
      $.each(data.result.list, function (idx, val) {
        strs += "<li>" + "<a href='http://m.86sb.com/detail.php?id=" + val.id + "'><img src=" + val.sbpic + "><div class='proname'><span>" + val.sbname + "</span> <span class='lei'>" + val.className + "</span></div> <p>" + val.sbcontact + "</p><div class='price'>￥" + val.sbprice + "</div><button>买标献爱心</button></a></li>"
      });
      $('.sale .list ul').html(strs);
      
      
      var page = 1;
      //下一页
      $('#next').on('click', function () {
        page++;
        if (page > MaxPageCount) {
          page = MaxPageCount;
        }
        $(".sale .page span").eq(page).css("background-color","#d72614").siblings().css("background-color","#fff");
        $(".sale .page span").eq(page).css("color","#fff").siblings().css("color","#a6a6a6");
        myAjax(page);
      })
  
      
      // 上一页
      $('#prev').on('click', function () {
        page--;
        if (page < 1) {
          page = 1;
        }
        $(".sale .page span").eq(page).css("background-color","#d72614").siblings().css("background-color","#fff");
        $(".sale .page span").eq(page).css("color","#fff").siblings().css("color","#a6a6a6");
        myAjax(page);
      });
      
      // 点击页码
      $(".sale .page .num").on("click",function () {
        var pageNum = $(this).html();
        $(this).css("background-color","#d72614").siblings().css("background-color","#fff");
        $(this).css("color","#fff").siblings().css("color","#a6a6a6");
        myAjax(pageNum);
      })
    },
    beforeSend:function(){
      $(".block").css("display","block");
    },
    error: function () {
      console.log("请求出错啦");
    }
  });
  
  
  
  function myAjax(page) {
    $.ajax({
      type: "get",
      url: "/charity/list",
      dataType: 'json',
      data: {
        page: page
      },
      beforeSend:function(){
        $(".block").css("display","block");
      },
      success: function (data) {
        $(".block").css("display","none");
        console.log(data);
        //商品列表数据渲染
        var strs = '';
        $.each(data.result.list, function (idx, val) {
          strs += "<li>" + "<a href='http://m.86sb.com/detail.php?id=" + val.id + "'><img src=" + val.sbpic + "><div class='proname'><span>" + val.sbname + "</span> <span class='lei'>" + val.className + "</span></div> <p>" + val.sbcontact + "</p><div class='price'>￥" + val.sbprice + "</div><button>买标献爱心</button></a></li>"
        });
        $('.sale .list ul').html(strs);
        $('body,html').animate({'scrollTop': 670}, 1000);
      }
    })
  }
  
})




