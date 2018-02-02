// Using Ajax
// This function is getting the zip code from the input fields and calculating the latitude and longitud.

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
						type: "text",
						data: `${res_id}`,
						value: `${comment.comment}`
					});
					$(`#${res_id}`).append(commentSpace);
				});
			},
			error: function(xhr, status, error) {}
		});
	});
});
// ends doc.ready
