package com.github.dwa012.clearlyspeaking;

import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.glassware.AuthUtil;
import com.google.glassware.WebUtil;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: danielward
 * Date: 5/5/13
 * Time: 8:48 PM
 * To change this template use File | Settings | File Templates.
 */
public class MessageServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // Game creation, user sign-in, etc. omitted for brevity.
        String userId = AuthUtil.getUserId(req);

        ChannelService channelService = ChannelServiceFactory.getChannelService();

        channelService.sendMessage(new ChannelMessage(userId, "stuff"));
        resp.sendRedirect(WebUtil.buildUrl(req, "/"));
    }
}
