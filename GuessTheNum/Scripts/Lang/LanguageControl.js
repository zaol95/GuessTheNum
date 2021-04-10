var viewId = 'game';
function LanguageControl(ids) {
    var langTokens = lang[viewId];
    $.each(langTokens, function (key, val) {
        $('#' + key).html(val);
    });
}