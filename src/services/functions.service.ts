import LocutusStrings from "locutus/php/strings";

export class Functions{
    public stripAndDecode(input: any, allowedtags: string){
        var decodeInput =  LocutusStrings.html_entity_decode(input, 'ENT_COMPAT');

        if(allowedtags != ''){
            var stripInput = LocutusStrings.strip_tags(decodeInput, allowedtags);
        } else {
            var stripInput = LocutusStrings.strip_tags(decodeInput);
        }
        
        return stripInput;
    }

    public getFeaturedImage(input: any, defaultImage: any){
        var regex = /<img.+?src=[\"'](.+?)[\"'].*?>/;
        var getSrc = regex.exec(input);
        if (getSrc !== null){
            return getSrc[1];
        } else {
            return defaultImage;
        }
    }

    getImagesFromString(input: any){
        var m;
        var urls = [];
        var rex = /<img.+?src=[\"'](.+?)[\"'].*?>/g;

        while ( m = rex.exec( input ) ) {
            urls.push( m[1] );
        }

        return urls;
    }

    getWPOriginalResolution(input: string){
        var regex = /^(.+)-\d+?x\d+?(\.\w+)$/;
        var getSrc = regex.exec(input);
        return getSrc[1];
    }
}