var site = {
    settings: {
        debug: false
    },
    log: function(msg, type){
        type = typeof type !== 'undefined' ? type : 'log';
        if(this.settings.debug && console){
            switch(type) {
                case 'warn':
                    console.warn(msg);
                    break;
                case 'error':
                    console.error(msg);
                    break;
                default:
                    console.log(msg);
            }
        }
    },
    init: function(settings){
        $.extend(this.settings, settings);

        if($(window).width() > 700){
            site.equalHeight();
        }
    },
    equalHeight: function(){
        var $one = $('#twitter-block'),
            $two = $('#facebook-block');

        if($one.height() > $two.height()){
            $two.height($one.height());
        } else {
            $one.height($two.height());
        }
    }
};

var twitter = {
    settings: {
        container: false,
        displaylimit: 10,
        twitterprofile: false,
        screenname: false,
        showheader: true,
        showdirecttweets: false,
        showretweets: true,
        showtweetlinks: true,
        showprofilepic: true,
        showtweetactions: false,
        showretweetindicator: true,
    },
    globals: {
        headerHTML: '',
        loadingHTML: '',
        feedHTML: ''
    },
    init: function(settings){
        $.extend(twitter.settings, settings);

        if(!twitter.settings.container.length){
            console.error('[Twitter] No container set');
            return false;
        }

        if(!twitter.settings.twitterprofile.length){
            console.error('[Twitter] No twitter profile set');
            return false;
        }

        twitter.startload();
    },
    startload: function(){
        if(twitter.settings.showheader){
            twitter.globals.headerHTML += '<h1>' + twitter.settings.screenname + ' <span style="font-size:13px"><a href="https://twitter.com/' + twitter.settings.twitterprofile + '" target="_blank">@' + twitter.settings.twitterprofile + '</a></span></h1>';
        }

        // twitter.globals.loadingHTML += '<div id="loading-container"><img src="img/ajax-loader.gif" width="32" height="32" alt="tweet loader" /></div>';

        twitter.settings.container.html(twitter.globals.headerHTML + twitter.globals.loadingHTML);

        twitter.getTweets();
    },
    getTweets: function(){
        var tuser = twitter.settings.twitterprofile;

        if($('body').attr('lang')=== 'nl'){
            tuser = 'deshedevil';
        }

        $.ajax({
            dataType: 'json',
            url: 'utils/get-tweets.php',
            data: {
                twitteruser: tuser
            },
            success: function(feeds) {
                var displayCounter = 1;

                for (var i = 0; i < feeds.length; i++) {
                    var tweetscreenname = feeds[i].user.name;
                    var tweetusername = feeds[i].user.screen_name;
                    var profileimage = feeds[i].user.profile_image_url_https;
                    var status = feeds[i].text;
                    var isaretweet = false;
                    var isdirect = false;
                    var tweetid = feeds[i].id_str;

                    if(typeof feeds[i].retweeted_status !== 'undefined'){
                        profileimage = feeds[i].retweeted_status.user.profile_image_url_https;
                        tweetscreenname = feeds[i].retweeted_status.user.name;
                        tweetusername = feeds[i].retweeted_status.user.screen_name;
                        tweetid = feeds[i].retweeted_status.id_str;
                        status = feeds[i].retweeted_status.text;
                        isaretweet = true;
                    }

                    if (feeds[i].text.substr(0,1) === '@') {
                        isdirect = true;
                    }

                    if (((twitter.settings.showretweets === true) || ((isaretweet === false) && (twitter.settings.showretweets === false))) && ((twitter.settings.showdirecttweets === true) || ((twitter.settings.showdirecttweets === false) && (isdirect === false)))) {
                        if ((feeds[i].text.length > 1) && (displayCounter <= twitter.settings.displaylimit)) {
                            if (twitter.settings.showtweetlinks === true) {
                                status = twitter.addlinks(status);
                            }

                            if (displayCounter === 1) {
                                twitter.globals.feedHTML += twitter.globals.headerHTML;
                            }

                            twitter.globals.feedHTML += '<div class="twitter-article" id="tw' + displayCounter + '">';

                            if(twitter.settings.showprofilepic){
                                twitter.globals.feedHTML += '<div class="twitter-pic"><a href="https://twitter.com/' + tweetusername + '" target="_blank"><img src="' + profileimage + '"img/twitter-feed-icon.png" width="42" height="42" alt="twitter icon" /></a></div>';
                            }

                            twitter.globals.feedHTML += '<div class="twitter-text"><p>';
                            // twitter.globals.feedHTML += '<span class="tweetprofilelink"><strong><a href="https://twitter.com/' + tweetusername + '" target="_blank">' + tweetscreenname + '</a></strong> <a href="https://twitter.com/' + tweetusername + '" target="_blank">@' + tweetusername + '</a></span>';
                            twitter.globals.feedHTML += '<span class="tweet-time">' + twitter.relative_time(feeds[i].created_at)+'</span>';
                            twitter.globals.feedHTML += status + '</p>';

                            if (isaretweet && twitter.settings.showretweetindicator) {
                                twitter.globals.feedHTML += '<div id="retweet-indicator"></div>';
                            }
                            if (twitter.settings.showtweetactions) {
                                twitter.globals.feedHTML += '<div id="twitter-actions"><div class="intent" id="intent-reply"><a href="https://twitter.com/intent/tweet?in_reply_to=' + tweetid + '" title="Reply"></a></div><div class="intent" id="intent-retweet"><a href="https://twitter.com/intent/retweet?tweet_id=' + tweetid + '" title="Retweet"></a></div><div class="intent" id="intent-fave"><a href="https://twitter.com/intent/favorite?tweet_id=' + tweetid + '" title="Favourite"></a></div></div>';
                            }

                            twitter.globals.feedHTML += '</div>';
                            twitter.globals.feedHTML += '</div>';
                            displayCounter++;
                        }
                    }
                }

                $('#twitter-feed').html(twitter.globals.feedHTML);

                site.equalHeight();

                //Add twitter action animation and rollovers
                if (twitter.settings.showtweetactions) {
                    $('#twitter-actions a').click(function(){
                        var url = $(this).attr('href');
                        window.open(url, 'tweet action window', 'width=580,height=500');
                        return false;
                    });
                }
            }
        });
    },
    addlinks: function(data) {
        //Add link to all http:// links within tweets
        data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
            return '<a href="' + url + '"  target="_blank">' + url + '</a>';
        });

        //Add link to @usernames used within tweets
        data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
            return '<a href="http://twitter.com/' + reply.substring(1) + '" target="_blank">' + reply.charAt(0) + reply.substring(1) + '</a>';
        });
        //Add link to #hastags used within tweets
        data = data.replace(/\B#([_a-z0-9]+)/ig, function(reply) {
            return '<a href="https://twitter.com/search?q=' + reply.substring(1) + '" target="_blank">'+reply.charAt(0)+reply.substring(1) + '</a>';
        });

        return data;
    },
    relative_time: function(time_value) {
        var values = time_value.split(' ');

        time_value = values[1] + ' ' + values[2] + ', ' + values[5] + ' ' + values[3];

        var parsed_date = Date.parse(time_value);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
        var shortdate = time_value.substr(4,2) + ' ' + time_value.substr(0,3);

        delta = delta + (relative_to.getTimezoneOffset() * 60);

        if (delta < 60) {
            return '1m';
        } else if(delta < 120) {
            return '1m';
        } else if(delta < (60*60)) {
            return (parseInt(delta / 60)).toString() + 'm';
        } else if(delta < (120*60)) {
            return '1h';
        } else if(delta < (24*60*60)) {
            return (parseInt(delta / 3600)).toString() + 'h';
        } else if(delta < (48*60*60)) {
            //return '1 day';
            return shortdate;
        } else {
            return shortdate;
        }
    }
};

$(function(){
    site.init({
        debug: true
    });

    twitter.init({
        displaylimit: 4,
        twitterprofile: 'diablessebelge',
        screenname: 'x',
        showheader: false,
        showprofilepic: false,
        container: $('#twitter-feed')
    });
});
