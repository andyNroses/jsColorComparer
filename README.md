# jsColorComparer
jQuery Plugin to compare colors.

Usage
-----

```html
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="path/to/jsColorComparer.js"></script>
    
    <script>
        var colors = new Array("#2653b3", "#5d3c0e", {r: 144, g: 210, b: 146});
        //Finding darker color
        var darker = jsColorComparer.whichIsDarker(colors);
        //Finding lighter color
        var lighter = jsColorComparer.whichIsLighter(colors);
    </script>
``` 

Methods
-------

Method | Params | Description | Return
------ | ------ | ----------- | -------
whichIsDarker | Color Array (Hex, RGB) | Compares colors to find darker | Darker color (given format)
whichIsLighter | Color Array (Hex, RGB) | Compares colors to find lighter | Lighter color (given format)
