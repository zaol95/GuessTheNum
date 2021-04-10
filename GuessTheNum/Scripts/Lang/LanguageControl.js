function LanguageControl(viewId, language) {
    var langTokens = lang[viewId][language];
    $.each(langTokens, function (key, val) {
        $('#' + key).html(val);
    });
}