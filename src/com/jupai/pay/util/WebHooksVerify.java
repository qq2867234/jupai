package com.jupai.pay.util;

import java.io.IOException;
import java.nio.charset.Charset;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;
import org.springframework.util.StreamUtils;

/**
 * Created by sunkai on 15/5/19. webhooks 验证签名示例
 * 
 * 该实例演示如何对 ping++ webhooks 通知进行验证。
 * 验证是为了让开发者确认该通知来自 ping++ ，防止恶意伪造通知。用户如果有别的验证机制，可以不进行验证签名。
 * 
 * 验证签名需要 签名、公钥、验证信息，该实例采用文件存储方式进行演示。
 * 实际项目中，需要用户从异步通知的 HTTP header 中读取签名，从 HTTP body 中读取验证信息。公钥的存储方式也需要用户自行设定。
 * 
 *  该实例仅供演示如何验证签名，请务必不要直接 copy 到实际项目中使用。
 * 
 */
public class WebHooksVerify {
	
	private static final Logger log = Logger.getLogger(WebHooksVerify.class);
	
	private static PublicKey publicKey = null;
	
	/**
	 * 验证签名
	 * @param data
	 * @param sigBytes
	 * @param publicKey
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeyException
	 * @throws SignatureException
	 * @throws IOException 
	 * @throws InvalidKeySpecException 
	 */
	public static boolean verify(byte[] data, byte[] sigBytes) {
		try {
			Signature signature = Signature.getInstance("SHA256withRSA");
			signature.initVerify(getPubKey());
			signature.update(data);
			return signature.verify(sigBytes);
		} catch (Exception e) {
			log.error("验证Ping++签名异常. ", e);
			return false;
		}
	}
	
	/**
	 * 获得公钥
	 * @return
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 * @throws InvalidKeySpecException 
	 * @throws Exception
	 */
	public static PublicKey getPubKey() throws IOException, NoSuchAlgorithmException, InvalidKeySpecException  {
		if(publicKey == null){
			synchronized (WebHooksVerify.class) {
				if(publicKey == null){
					// read key bytes
					String pubKey = StreamUtils.copyToString(WebHooksVerify.class.getClassLoader().getResourceAsStream("my-server.pub"), Charset.forName("UTF-8"));
					pubKey = pubKey.replaceAll("(-+BEGIN PUBLIC KEY-+\\r?\\n|-+END PUBLIC KEY-+\\r?\\n?)", "");
					// generate public key
					X509EncodedKeySpec spec = new X509EncodedKeySpec(Base64.decodeBase64(pubKey.getBytes()));
					KeyFactory keyFactory = KeyFactory.getInstance("RSA");
					publicKey = keyFactory.generatePublic(spec);
				}
			}
		}
		return publicKey;
	}
	
}
