// 複数埋め込みにも対応するよう、youtubeというclassに対してループで処理
$('.youtube').each(function() {
  var iframe = $(this).children('iframe');

  // data-srcからURLを取得
  var url = iframe.attr('data-src');
  // URLから動画IDを取得
  var id = url.match(/[\/?=]([a-zA-Z0-9_-]{11})[&\?]?/)[1];

  // 動画IDを使用してサムネイル画像を取得・配置
  iframe.before('<img src="https://img.youtube.com/vi/'+id+'/sddefault.jpg" />').remove();

  // 動画クリックした時の処理
  $(this).on('click', function() {
    // 矢印をフェードで非表示
    $(this).siblings('.arrow').fadeOut(400);
    // 動画IDからを埋め込み用タグを生成
    $(this).after('<div class="youtube"><iframe src="https://www.youtube.com/embed/'+id+'?=loop=1&playlist='+id+'&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>').remove();
  });
});
