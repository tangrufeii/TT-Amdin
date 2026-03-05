package com.tt.server.config.mvc;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * ???????
 * - ?? /doc.html ??? Knife4j ??
 * - ?? /doc-watch.html ????????? /doc-live
 */
@Controller
public class SwaggerDocController {

    @GetMapping("/doc-watch.html")
    public String redirectDocWatch(HttpServletRequest request) {
        String query = request.getQueryString();
        if (query == null || query.isBlank()) {
            return "redirect:/doc-live";
        }
        return "redirect:/doc-live?" + query;
    }
}
