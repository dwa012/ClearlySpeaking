package com.github.dwa012.clearlyspeaking;

import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.glassware.AuthUtil;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.KeyFactory;

/**
 * Created with IntelliJ IDEA.
 * User: danielward
 * Date: 5/4/13
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */
public class TokenServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // Game creation, user sign-in, etc. omitted for brevity.
        String userId = AuthUtil.getUserId(req);

        ChannelService channelService = ChannelServiceFactory.getChannelService();

        // The 'Game' object exposes a method which creates a unique string based on the game's key
        // and the user's id.
        String token = channelService.createChannel(userId);

        String response = "{\"token\":\""+ token +"\"}";

        resp.setContentType("application/json");
        resp.getWriter().write(response);
    }
}
