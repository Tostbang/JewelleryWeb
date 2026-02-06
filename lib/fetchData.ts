import { isRedirectError } from "next/dist/client/components/redirect-error";
import { deleteToken, getToken } from "./helpers";
import { getErrorMessage } from "./errorMessage";

const URL = "https://jewelerapi20260130150239.azurewebsites.net/api/";

type Options = {
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS';
  secure?: boolean;
  headers?: HeadersInit;
  body?: object;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
  bodyType?: 'json' | 'file';
};
export async function FetchData(
  path: string,
  {
    method = 'GET',
    secure = false,
    headers,
    body,
    cache = 'no-store',
    tags,
    bodyType = 'json',
    revalidate = false,
  }: Options = {},
) {
  try {
    const response = await fetch(`${URL}${path}`, {
      method,
      headers: {
        ...(bodyType === 'json' && { 'Content-Type': 'application/json' }),
        Authorization: secure ? `Bearer ${getToken()}` : '',
        Accept: 'text/plain',
        // ...(bodyType === 'json' ? {  } : { "Content-Type": "multipart/form-data" }),
        ...headers,
      },
      body: bodyType === 'json' ? JSON.stringify(body) : (body as FormData),
      ...(!revalidate && { cache }),
      ...{ next: { tags, ...(revalidate && { revalidate }) } },
    });
    // ...(cache !== 'no-store' && { revalidate })
    if (!response.ok) {
      if (response.status === 401) {
        deleteToken()
        window.location.href = `/login`
      }
      throw new Error("beklenmeyen bir hata oluştu");
    }
    const result = await response.json();

    //handle the request if it is unauthorized
    if (result && result.code && result.code !== '200') {
      if (result.code === "401") {
        deleteToken()
        window.location.href = `/login`
      }
      throw new Error(result.errors[0] ?? result.message);
    }
    return result;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    throw new Error(getErrorMessage(error));
  }
}