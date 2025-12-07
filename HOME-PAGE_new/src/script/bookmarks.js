window.addEventListener('load', () => {
	fetch("../src/data/bookmarks.json")
		.then((response) => response.json())
		.then((data) => {
			CreateBookmarks(data);
		})
		.catch((e) => {
			console.error(e);
			if (bookmarks_data) {
				CreateBookmarks(bookmarks_data);
			}
		});

	$('#homeSwitch').change(() => {
		SetBookmarkVisibility();
	})
});

function CreateBookmarks(data) {
	let homeHtml = "<div class='bookmarks' id='home'>";
	let workHtml = "<div class='bookmarks' id='work'>"

	data.forEach(bookmark => {
		//console.log(bookmark);
		if (!bookmark.name || !bookmark.url || !bookmark.category) {
			//skip
			return;
		}
		if (bookmark.img_name) {
			bookmark.iconLocation = `/img/bookmarks/${bookmark.img_name}.png`;
		}
		else {
			bookmark.iconLocation = `/img/bookmarks/${bookmark.name}.png`;
		}
		if (bookmark.category.includes("home")) {
			homeHtml += GetBookmarkCard(bookmark);
		}
		if (bookmark.category.includes("work")) {
			workHtml += GetBookmarkCard(bookmark);
		}
	});

	homeHtml += "</div>";
	workHtml += "</div>";

	$('#urls').append(homeHtml);
	$('#urls').append(workHtml);

	SetBookmarkVisibility();
}

function GetBookmarkCard(bookmark) {
	const html = `
	<a class='bookmark' href='${bookmark.url}' title='${bookmark.description}'>
		<div class='icon'>
			<img src='${bookmark.iconLocation}'>
		</div>
		<div class='name'>
			${bookmark.name}
		</div>
	</a>
	`
	return html;
}

function SetBookmarkVisibility() {
	const homeSwitch = document.getElementById('homeSwitch');
	if (homeSwitch.checked) {
		console.log("home");
		$('#work.bookmarks').addClass('displayNone');
		$('#home.bookmarks').removeClass('displayNone');
	}
	else {
		$('#work.bookmarks').removeClass('displayNone');
		$('#home.bookmarks').addClass('displayNone');
	}
}