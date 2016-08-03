jQuery.ajax({
            url: "/assets/jsontest,
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function(resultData) {
                //here is your json.
                  // process it

            },
            error : function(jqXHR, textStatus, errorThrown) {
            },

            timeout: 120000,
        });
