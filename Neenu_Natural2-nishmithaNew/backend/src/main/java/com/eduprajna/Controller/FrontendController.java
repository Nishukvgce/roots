package com.eduprajna.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {
    
    /**
     * Forward all non-API requests to index.html for React Router to handle
     * This ensures that client-side routing works properly in production
     */
    @RequestMapping(value = {"/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}"})
    public String forward() {
        return "forward:/index.html";
    }
}