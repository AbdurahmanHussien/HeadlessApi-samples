package news.client.dto.v1_0;

import java.io.Serializable;

import java.util.Objects;

import javax.annotation.Generated;

import news.client.dto.v1_0.NewsArticle;
import news.client.function.UnsafeSupplier;
import news.client.serdes.v1_0.NewsPageSerDes;

/**
 * @author ThinkPad
 * @generated
 */
@Generated("")
public class NewsPage implements Cloneable, Serializable {

	public static NewsPage toDTO(String json) {
		return NewsPageSerDes.toDTO(json);
	}

	public Integer getLastPage() {
		return lastPage;
	}

	public void setLastPage(Integer lastPage) {
		this.lastPage = lastPage;
	}

	public void setLastPage(
		UnsafeSupplier<Integer, Exception> lastPageUnsafeSupplier) {

		try {
			lastPage = lastPageUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Integer lastPage;

	public NewsArticle[] getNewsArticles() {
		return newsArticles;
	}

	public void setNewsArticles(NewsArticle[] newsArticles) {
		this.newsArticles = newsArticles;
	}

	public void setNewsArticles(
		UnsafeSupplier<NewsArticle[], Exception> newsArticlesUnsafeSupplier) {

		try {
			newsArticles = newsArticlesUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected NewsArticle[] newsArticles;

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public void setPage(UnsafeSupplier<Integer, Exception> pageUnsafeSupplier) {
		try {
			page = pageUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Integer page;

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public void setPageSize(
		UnsafeSupplier<Integer, Exception> pageSizeUnsafeSupplier) {

		try {
			pageSize = pageSizeUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Integer pageSize;

	public Long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}

	public void setTotalCount(
		UnsafeSupplier<Long, Exception> totalCountUnsafeSupplier) {

		try {
			totalCount = totalCountUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Long totalCount;

	@Override
	public NewsPage clone() throws CloneNotSupportedException {
		return (NewsPage)super.clone();
	}

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}

		if (!(object instanceof NewsPage)) {
			return false;
		}

		NewsPage newsPage = (NewsPage)object;

		return Objects.equals(toString(), newsPage.toString());
	}

	@Override
	public int hashCode() {
		String string = toString();

		return string.hashCode();
	}

	public String toString() {
		return NewsPageSerDes.toJSON(this);
	}

}