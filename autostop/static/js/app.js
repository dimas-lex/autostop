'use strict';
var App = (function() {
    if (!String.format) {
        String.format = function(format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        };
    }
    String.prototype.format = function() {
        var str = this.toString();
        var args = Array.prototype.slice.call(arguments);
        args.unshift(str);

        return String.format.apply(null, args);
    };

    $(document).ajaxSend(function(event, xhr, settings) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        function sameOrigin(url) {
            // url could be relative or scheme relative or absolute
            var host = document.location.host; // host + port
            var protocol = document.location.protocol;
            var sr_origin = '//' + host;
            var origin = protocol + sr_origin;
            // Allow absolute or scheme relative URLs to same origin
            return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
                (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
        }

        function safeMethod(method) {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    });
    jQuery.ajaxFormSubmit = function(form, onSuccess, onFail, scope) {
        if (!form) {
            return onFail.call(scope);
        }
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize()
        }).done(
            onSuccess.bind(scope)
        ).fail(
            onFail.bind(scope)
        );
    };

    return {
        Utils: {
            getDataFromRow: function(cell) {
                if (!cell) {
                    return {};
                }
                return App.Utils.getDataFrom($(cell).closest('tr').children("td"));
            },
            getDataFrom: function(fields) {
                var values = {};
                if (fields) {
                    fields.each(function() {
                        var key = $.trim($(this).data('name'));
                        var value = $.trim($(this).text());
                        values[key] = value;
                    });
                }

                return values;
            }
        }
    };

})();
var Utils = (function() {
    return {
        createUUID: function() {
            // http://www.ietf.org/rfc/rfc4122.txt
            //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(chr) {
                var rnd = Math.random() * 16 | 0,
                    val = chr === 'x' ? rnd : (rnd & 0x3 | 0x8);
                return val.toString(16);
            }).toUpperCase();
        }
    };
})();