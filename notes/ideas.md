1. no more need for >1 source element
1.a. if a request is made by src="media/foo", pk will determine best option and respond accordingly

2. no more need to export 9345085093853045 formats
2.a. export 1 format. the built in /media/ dir is "watched", ffmpeg will make the other files for you
2.b. will be configurable and such

3. libav wrapper will provide JSON serialization of avprobe returned headers
3.a. A request for "/media/foo.webm?meta=json" will provide this to browser apps

4. Generate new media files
4.a. POSTs to a special "app" endpoint, tentatively named "stitch", with post body that includes an object with a list of videos and in/out points representing clips will be stitched together by ffmpeg and stored in "/media"


Mike Taylr noted that some ideas are similar to http://m.vid.ly/user/