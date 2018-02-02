// Using Ajax
$(function() {
	// delete button;
	$("#delete").click(function(e) {
		// selecting the restaurant's id from hidden input
		e.preventDefault();
		const id = $("#res_id").val();
		console.log(id);
		console.log(`Deleting id: ${id}`);
		// Prompt user before deleting
		const confirm = window.confirm("Are you sure you want to delete this?");
		if (confirm) {
			// execute if user selects okay
			$.ajax({
				url: `/dinelist/${id}`, // Path
				type: "DELETE",

				success: function(data) {
					console.log("deleting ", data);
					// redirect to restaurants list after deleting an individual restaurant
					window.location.href = "/dinelist";
				},
				error: function(xhr, status, error) {
					// add error handler
				}
			});
		}
	});

	$("#comment").click(function(e) {
		//create comment function
		e.preventDefault();
		const new_comment = $("#text_comment").val();
		const res_id = $("#text_comment").data("res-id");
		const author_name = $("#author").val();
		const data = { comment: new_comment, author: author_name };
		console.log(new_comment, res_id);
		$.ajax({
			url: `/dinelist/${res_id}`, // Path
			type: "POST",
			data: data,
			success: function(data) {
				console.log("added", comment);
				window.location.href = "/dinelist";
			},
			error: function(xhr, status, error) {}
		});
	});

	$(".comments").click(function(e) {
		//create comment function
		e.preventDefault();
		const res_id = $(this).data("res-id");
		$.ajax({
			url: `/dinelist/${res_id}/comments`, // Path
			type: "GET",

			success: function(data) {
				console.log("added", data);

				data.comments.forEach(function(comment) {
					console.log(comment.comment);
					var commentSpace = $("<input>").attr({
						class: "change",
						type: "text",
						data: `${res_id}`,
						value: `${comment.comment}`
					});
					var edit = $("<button>").attr({
						type: "text",
						data: `${res_id}`,
						value: "Edit comment",
						name: "_METHOD",
						value: "PUT"
					});
					$(`#${res_id}`).append(commentSpace);
					$(`#${res_id}`).append(edit);
				});
			},
			error: function(xhr, status, error) {}
		});
		$(".comments").off("click");
	});

	$(".change").change(function(e) {
		// 	const res_id = $("#text_comment").data("res-id");
		// const data = { comment: new_comment, author: author_name };
		console.log(e.target);
		$.ajax({
			url: `/dinelist/${res_id}/new_comment`, // Path
			type: "PUT",
			data: data,
			success: function(data) {
				console.log("added", data);
				// window.location.href = "/dinelist";
			},
			error: function(xhr, status, error) {}
		});
	});
}); // ends doc.ready
