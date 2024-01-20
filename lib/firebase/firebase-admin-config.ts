import type {App} from 'firebase-admin/app'
import type {DecodedIdToken} from 'firebase-admin/auth'
import {initializeApp, getApps, getApp, cert} from 'firebase-admin/app'
import {getAuth} from 'firebase-admin/auth'

const firebaseAdminConfig = {
  credential: cert({
    projectId: "radiantrecipe-ca4c6",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDsqWw72Bfo7ehM\nONaptGt5TRrXjCMVdhP5Bo4YwNkXi1qFT5m0iBJO/y4pdNRbGnEdOn/vnSJCAQa7\nLzMsRCwGUGTdAo9/F8BebKjgiUvnkY8svNu/1CL/xX05Y6NhGad7FypnX1G6WtIc\nXIcIDZqHRAuQrxUMsHJtyY+LaX2y3yGZw8ndjUV1q1RrT7zNHu4GFkhLfc3yjgfi\nmFugJSCDRWGC2CyCc/Gzknd3XuozoTE7GVlRlhi9PbwcHMTm1D12XovOGeyWeIWB\nqfouPSWHwIz/1J1jFLhlSlNslTpLJdq2YcmLSe84XrCudmmUkXqLWPd4zJyqQqxK\nHJ+Sa26VAgMBAAECggEAFEMRJDKFIYk06Um4f0EWLoV+ddPmsRCx9xErm0zviUeC\nEYXWKBG6V48beasp/z7NTm5Sw8YVR8dktyP8Yp7XkhbR++YbOQtkifENqGO43vOk\naXUl70+PS4yyAvbX5xlWMIC0PbN4gNcDxC/b08GuaERYJSQITlTRBztJkesPOwAb\naOiT0eOVUXPJOYnnROwgcKk3ERHebAtsazodIgVwFTUxEbnLcPIZh5oA8b/XEH9p\nrh+LR/PKLls/o4njtlTwHurKhsFZWg0SLuYm0UT4IEvWkNZKUDZH9aC+Bz0XCDVm\nkqUhnyNaDC0hI5W6e9Z5Djt0cWfO1qZ8jEQNB9BRQQKBgQD+6hH0qT0B2aR9O7/e\nSjjVKcwBqNWavIwxJlSQ6eI2OWIuray8EsvXtR9nIcAniawO0EYoTg/X3vpLBOzq\ncRgP3Cq7giMbKfR09Aq0ZwU65QoIifmcHteexYgNzXuHCHEFWSwn1BkfAopuh6s4\nGjtpbTwBkDLR3jO1OJ/2vZHucQKBgQDtq3PAA2Kv4AxgOjt46cOt+Lrj2FCIWb0E\nAtJl68DJ9Per4PJyReKpc5basOzJff/NcJA923Z2D1YC3v+1OFcZTlUlIjkmxPZ7\nCuRoKPTI3Hm0vv+WzSGUod8H+8I5s+1Tpq2/0MmOZTmfPSfmQzk8qDIZgJCn9u5J\n7xqwmAQcZQKBgAa0qZxCB3TRAN66f6WdVjllTBSPGG9lnlp8o6TcQjMi9047C1w3\nMl2OSjEwVhm0KW6KVA4jX49SMkte6cyRBQ0FwaoFFl9UjzW0ZcOxIhYWiFkJKCPP\nO+TVVWrniORYeICng93YWoDSVEnsD7j+F6oCUZ3I6U1UBxAxWSPogLpBAoGBAIeB\nCiR+iaSGk+fFK6U7elJVDpDbAsdKiqafyT9M04URgqffP7uBNsKv4WFcIBSdHtwN\ngl+SIY8cHUjTxWyX66jE7WyXf4goIfNy+VidiTp/4W/4uZZL7Apm49cUZd8qQ3Q/\nAq7rJg9mjRzJ7FavGxIHP1Ek6NSqx58lkM0ATs+1AoGBALXDsQvMxabx/JFLpxzM\n+PrgOW3QQnrvPSYcKZ/tT0nirPLX9vMfHtqL2dA4263q2pCco1N2BRVm1tCOc/CA\nvNE/qsRLPz44wq1od1lpiu1Knp9GxG2DyKfHgBJXvUbq5xvd6dw7wBT3wTwA7+gt\nLXmN8V9J+S1kth23r3IWzVUb\n-----END PRIVATE KEY-----\n",
    clientEmail:
      "firebase-adminsdk-rzee1@radiantrecipe-ca4c6.iam.gserviceaccount.com",
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}


export const getAdminApp = (): App =>
	getApps().length ? getApp() : initializeApp(firebaseAdminConfig)

export const createSessionCookie = async (token: string, maxAge: number) => {
	const expiresIn = maxAge * 1000
	const auth = getAuth(getAdminApp())
	const session = await auth.createSessionCookie(token, {
		expiresIn,
	})

	return `session=${session}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${maxAge};`
}

export const createSessionCookieForUserId = async (
	userId: string,
	maxAge: number
) => {
	const auth = getAuth(getAdminApp())
	const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

	const customToken = await auth.createCustomToken(userId, {})
	const firebaseIdToken = await fetch(
		`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${apiKey}`,
		{
			method: 'POST',
			body: JSON.stringify({token: customToken, returnSecureToken: true}),
		}
	)
		.then((res) => res.json())
		.then((res) => res.idToken)

	return createSessionCookie(firebaseIdToken, maxAge)
}

export const verifyIdToken = (token: string): Promise<DecodedIdToken> => {
	const auth = getAuth(getAdminApp())
	return auth.verifyIdToken(token)
}

export const getIdTokenFromSessionCookie = async (
	sessionCookie: string | null
): Promise<DecodedIdToken | null> => {
	if (!sessionCookie) return null

	const auth = getAuth(getAdminApp())

	return auth.verifySessionCookie(sessionCookie, true).catch(() => null)
}